import { BehaviorSubject, Observable } from 'rxjs';

export type SseEventKey = 'VOID' | 'TEST';

interface ServerSentMap<T>
    extends Partial<Record<SseEventKey, BehaviorSubject<Observable<T>>>> {}

export type ServerSentStreamTemplate<T> = {
    type: SseEventKey;
    data: T;
};

export const serverSentMap: ServerSentMap<unknown> = {};

const globalSseEvent = (key: SseEventKey) => {
    let eventSource = new EventSource('/api/event', {
        withCredentials: false,
    });
    eventSource.onmessage = (event) => {
        serverSentMap[key]?.next(JSON.parse(event.data));
    };

    eventSource.onerror = (error) => {
        console.log('error', error);
        console.log('readyState:', eventSource.readyState); // 추가 디버깅 정보

        if (eventSource.readyState != 0) {
            serverSentMap[key]?.error(error);
            //setTimeout(() => {
            // 즉시 재연결로 수정 2024 08 03
            eventSource.close();
            eventSource = globalSseEvent(key);
            //}, 3000); // 3초 후 재연결
        } else {
            eventSource.close();
        }
    };
    return eventSource;
};

export const eventStream = <T>(key: SseEventKey) => {
    if (!serverSentMap[key]) {
        serverSentMap[key] = new BehaviorSubject(
            new Observable<unknown>((observer) => {
                let eventSource = globalSseEvent(key);
                return () => {
                    eventSource.close();
                };
            }),
        );
    }
    return serverSentMap[key];
};

/*
const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        console.log(entry);
    });
});
  
observer.observe({ type: "navigation", buffered: true });
*/
