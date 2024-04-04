import { documentKeyDown, documentKeyUp } from '@handler/globalEvents';
import { useEffect, useState } from 'react';

export const handleScrollWheelX = (
    event: React.WheelEvent,
    ref: React.RefObject<HTMLUListElement>,
    isShft: boolean,
) => {
    if (!ref.current || isShft) return;
    let { deltaY } = event;

    ref.current.scrollTo(ref.current.scrollLeft + deltaY, 0);
};

export const handleMouseMoveScrollWheelX = (
    event: React.MouseEvent,
    ref: React.RefObject<HTMLUListElement>,
    isMouseDown: boolean,
) => {
    if (!ref.current || !isMouseDown) return;
    ref.current.scrollLeft += event.movementX * -1;
};

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
