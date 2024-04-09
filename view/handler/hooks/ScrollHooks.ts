import { documentKeyDown, documentKeyUp } from '@handler/globalEvents';
import { useEffect, useState } from 'react';

export const useShiftDownScrollWheelXState = () => {
    const [isShft, setIsShft] = useState<boolean>(false);
    const keyDownSubscribe = documentKeyDown.subscribe((event) => {
        if (event.key !== 'Shift') return;
        setIsShft(true);
    });
    const keyUpSubscribe = documentKeyUp.subscribe((event) => {
        if (event.key !== 'Shift') return;
        setIsShft(false);
    });
    return { isShft, keyDownSubscribe, keyUpSubscribe };
};
