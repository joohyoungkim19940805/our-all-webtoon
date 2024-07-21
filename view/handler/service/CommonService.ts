import { ResponseWrapper } from '@type/ReesponseWrapper';
import {
    BehaviorSubject,
    Observable,
    Subscriber,
    catchError,
    concatMap,
    map,
    mergeMap,
    of,
    shareReplay,
    take,
    tap,
} from 'rxjs';
import { AjaxError, ajax } from 'rxjs/ajax';

const methodsMapper = {
    GET: 'search',
    POST: 'regist',
    PUT: 'update',
    DELETE: 'delete',
};
export interface ServiceArguments<T, R> {
    path: string;
    endpoint: string;
    method: keyof typeof methodsMapper;
    body?: T;
    resultHandler?: (response: ResponseWrapper<R>) => Promise<void>;
    headers?: Readonly<Record<string, string>>;
}
export interface CacheForService {
    cacheName: string;
    cacheTime: number;
    cacheSize?: number;
}

interface CacheMap<T> {
    [key: string]: BehaviorSubject<Observable<T>>;
}

export const cacheMap: CacheMap<unknown> = {};

export const callApi = <T, R>(serviceArguments: ServiceArguments<T, R>) => {
    return ajax<ResponseWrapper<R>>({
        url: `/api/${serviceArguments.path}/${methodsMapper[serviceArguments.method]}/${serviceArguments.endpoint}`,
        body: serviceArguments.body,
        method: serviceArguments.method,
        headers: serviceArguments.headers || undefined,
    }).pipe(
        tap((result) => {
            console.log(result);
            if (!serviceArguments.resultHandler) return;
            const { response } = result;
            serviceArguments
                .resultHandler(response)
                .catch((err) => console.error(err));
        }),
        map((result) => result.response?.data),
    );
};

const callApiForCache = <T, R>(
    serviceArguments: ServiceArguments<T, R>,
    cacheForService: CacheForService,
) => {
    return ajax<ResponseWrapper<R>>({
        url: `/api/${serviceArguments.path}/${methodsMapper[serviceArguments.method]}/${serviceArguments.endpoint}`,
        body: serviceArguments.body,
        method: serviceArguments.method,
        headers: serviceArguments.headers || undefined,
    }).pipe(
        tap((result) => {
            if (!serviceArguments.resultHandler) return;
            const { response } = result;
            serviceArguments
                .resultHandler(response)
                .catch((err) => console.error(err));
        }),
        map((result) => result.response.data),
        shareReplay(cacheForService.cacheSize || 1, cacheForService.cacheTime),
    );
};

export const callApiCache = <T, R>(
    serviceArguments: ServiceArguments<T, R>,
    cacheForService: CacheForService,
) => {
    let cacheSubject = cacheMap[cacheForService.cacheName] as BehaviorSubject<
        Observable<R>
    >;
    if (!cacheSubject) {
        cacheSubject = new BehaviorSubject(
            callApiForCache(serviceArguments, cacheForService),
        );
        cacheMap[cacheForService.cacheName] = cacheSubject as BehaviorSubject<
            Observable<unknown>
        >;
    }
    // const cacheSubject = new BehaviorSubject(
    //     callApiForCache(serviceArguments, cacheForService),
    // );
    return cacheSubject.pipe(
        concatMap((shared) =>
            shared.pipe(
                tap({
                    complete: () =>
                        cacheSubject.next(
                            callApiForCache(serviceArguments, cacheForService),
                        ),
                }),
            ),
        ),
        take(1),
        catchError((error: AjaxError) => {
            console.error(error);
            return of(null);
        }),
    );
};

//test
export const callApiCache2 = <T, R>(
    serviceArguments: ServiceArguments<T, R>,
    cacheForService: CacheForService,
) => {
    const cacheSubject = new BehaviorSubject(
        callApi(serviceArguments).pipe(
            shareReplay(cacheForService.cacheSize, cacheForService.cacheTime),
        ),
    );
    return cacheSubject.pipe(
        concatMap((shared) =>
            shared.pipe(
                tap({
                    complete: () =>
                        cacheSubject.next(
                            callApi(serviceArguments).pipe(
                                shareReplay(
                                    cacheForService.cacheSize,
                                    cacheForService.cacheTime,
                                ),
                            ),
                        ),
                }),
            ),
        ),
        take(1),
        catchError((error: AjaxError) => {
            console.error(error);
            return of(null);
        }),
    );
};

const createSSE = <T>(observer: Subscriber<T>, url: string) => {
    let eventSource = new EventSource(url, {
        withCredentials: false,
    });

    eventSource.onmessage = (event) => {
        console.log('message : ', event);
        observer.next(JSON.parse(event.data) as T);
    };

    eventSource.onerror = (error) => {
        console.log('error', error);
        console.log('readyState:', eventSource.readyState); // 추가 디버깅 정보

        if (eventSource.readyState != 0) {
            observer.error(error);
            setTimeout(() => {
                eventSource = createSSE(observer, url);
            }, 3000); // 3초 후 재연결
        } else {
            eventSource.close();
        }
    };
    return eventSource;
};

export const createSSEObservable = <T>(url: string) => {
    return new Observable<T>((observer) => {
        let eventSource = createSSE<T>(observer, url);
        return () => {
            eventSource.close();
        };
    });
};
