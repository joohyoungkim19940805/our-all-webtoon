import { documentKeyDown, documentKeyUp } from '@handler/globalEvents';
import { useEffect, useState } from 'react';
import scrollStyles from '@root/listScroll.module.css';
import { Subject, auditTime, debounceTime, delay, takeUntil } from 'rxjs';

export const useShiftDownScrollWheelX = (ref: React.RefObject<Element>) => {
    const [isShft, setIsShft] = useState<boolean>(false);
    const keyDownSubscribe = documentKeyDown.subscribe((event) => {
        if (event.key !== 'Shift') return;
        setIsShft(true);
    });
    const keyUpSubscribe = documentKeyUp.subscribe((event) => {
        if (event.key !== 'Shift') return;
        setIsShft(false);
    });
    useEffect(() => {
        return () => {
            keyUpSubscribe.unsubscribe();
            keyDownSubscribe.unsubscribe();
        };
    }, [ref]);
    return { isShft };
};

export const touchShowScrollHandle = (ref: React.RefObject<Element>) => {
    const delaySubject = new Subject<boolean>();
    useEffect(() => {
        //일정시간 동안(2500) 데이터가 방출 되지 않으면(.next()를 호출하지 않으면) show-scroll 클래스를 지운다.
        const subscribe = delaySubject
            .pipe(debounceTime(2500))
            .subscribe((isTouch) => {
                ref.current?.classList.remove(scrollStyles['show-scroll']);
            });
        return () => {
            subscribe.unsubscribe;
        };
    });
    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        ref.current?.classList.add(scrollStyles['show-scroll']);
        delaySubject.next(true);
    };
    const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        delaySubject.next(false);
    };

    return { handleTouchStart, handleTouchEnd };
};
