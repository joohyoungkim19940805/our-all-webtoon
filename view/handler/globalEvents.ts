import { ReplaySubject, Subject, fromEvent } from 'rxjs';

export const windowResize = fromEvent<UIEvent>(window, 'resize');

export const windowHashChange = fromEvent<HashChangeEvent>(
    window,
    'hashchange',
);

export const documentKeyDown = fromEvent<KeyboardEvent>(document, 'keydown');

export const documentKeyUp = fromEvent<KeyboardEvent>(document, 'keyup');

export const accessNavigation = new ReplaySubject<PerformanceEntry>(3);
performance.getEntriesByType('navigation').forEach((entry) => {
    accessNavigation.next(entry);
});

/*
const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        console.log(entry);
    });
});
  
observer.observe({ type: "navigation", buffered: true });
*/
