import { documentKeyDown, documentKeyUp } from '@handler/globalEvents';
import { useEffect, useState } from 'react';

export const useShiftDownScrollWheelXState = (
    ref: React.RefObject<Element>,
) => {
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
