import { ResponseWrapper } from '@type/ReesponseWrapper';
import {
    BehaviorSubject,
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
    responseType?: R | void;
    resultHandler?: (response: ResponseWrapper<R>) => Promise<void>;
}
export interface CacheForService {
    cacheTime: number;
    cacheSize: number;
}

const callApi = <T, R>(serviceArguments: ServiceArguments<T, R>) => {
    return ajax<ResponseWrapper<R>>({
        url: `/api/${serviceArguments}/${methodsMapper[serviceArguments.method]}/${serviceArguments.endpoint}`,
        body: serviceArguments.body,
        method: serviceArguments.method,
    }).pipe(
        tap((result) => {
            if (!serviceArguments.resultHandler) return;
            const { response } = result;
            serviceArguments
                .resultHandler(response)
                .catch((err) => console.error(err));
        }),
        map((result) => result.response.data),
    );
};

export const callApiCache = <T, R>(
    serviceArguments: ServiceArguments<T, R>,
    cacheForService: CacheForService,
) => {
    const cacheSubject = new BehaviorSubject(
        callApi(serviceArguments).pipe(
            shareReplay(cacheForService.cacheSize, cacheForService.cacheTime),
        ),
    );
    return cacheSubject.pipe(
        mergeMap((shared) =>
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
