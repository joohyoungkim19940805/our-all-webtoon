import {
    BehaviorSubject,
    Observable,
    ReplaySubject,
    Subject,
    auditTime,
    concatMap,
    distinctUntilChanged,
    filter,
    fromEvent,
    isEmpty,
    map,
    mergeMap,
    of,
    scan,
    takeUntil,
    takeWhile,
    throttleTime,
    timeout,
} from 'rxjs';

// 포커스 in일 때 true out일 때 false 플래그로 구분하여서 리사이즈 이벤트 방출 막기
// (사용자가 무언가 작성 중일시 키보드  UI 올라오면서 리사이즈되는 것 방지) 2024 05 06
export const documentFocusout = fromEvent<FocusEvent>(document, 'focusout');
export const documentFocusin = fromEvent<FocusEvent>(document, 'focusin');
let isFocus = false;
documentFocusin.subscribe({
    next: (ev) => (isFocus = (ev.target as Element).tagName == 'INPUT'),
});
documentFocusout
    .pipe(
        auditTime(1000),
        filter((ev) => document.activeElement?.tagName !== 'INPUT'),
    )
    .subscribe({
        next: (ev) => {
            if (isFocus) isFocus = false;
        },
    });
export const windowResize = fromEvent<UIEvent>(window, 'resize').pipe(
    distinctUntilChanged(),
    filter((ev) => document.activeElement?.tagName !== 'INPUT' && !isFocus),
);
export const windowHashChange = fromEvent<HashChangeEvent>(
    window,
    'hashchange',
);

export const documentKeyDown = fromEvent<KeyboardEvent>(document, 'keydown');

export const documentKeyUp = fromEvent<KeyboardEvent>(document, 'keyup');

export const windowMouseUp = fromEvent<MouseEvent>(window, 'mouseup');

export const windowMouseMove = fromEvent<MouseEvent>(window, 'mousemove');

export const accessNavigation = new ReplaySubject<PerformanceEntry>(3);
performance.getEntriesByType('navigation').forEach((entry) => {
    accessNavigation.next(entry);
});

interface ServerSentMap<T> {
    [key: string]: BehaviorSubject<Observable<T>>;
}

export const serverSentMap: ServerSentMap<unknown> = {};

/*
const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        console.log(entry);
    });
});
  
observer.observe({ type: "navigation", buffered: true });
*/
