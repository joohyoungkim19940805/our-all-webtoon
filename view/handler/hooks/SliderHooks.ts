import { windowMouseMove, windowMouseUp } from '@handler/globalEvents';
import { useShiftDownScrollWheelX } from '@handler/hooks/ScrollHooks';
import { useEffect, useRef, useState } from 'react';

export const useSliderItemVisible = (
    ref: React.RefObject<HTMLUListElement>,
) => {
    const [observer, setObserver] = useState<IntersectionObserver>();
    const [visibleTarget, setVisibleTarget] = useState<Element>();
    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    setVisibleTarget(entry.target);
                }),
            {
                root: ref.current,
                threshold: 0.3,
            },
        );
        setObserver(observer);
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.removedNodes.forEach((removedNode) => {
                        observer.unobserve(removedNode as Element);
                    });
                }
            });
        });
        mutationObserver.observe(ref.current, { childList: true });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, [ref]);
    return { visibleObserver: observer, visibleTarget };
};

export const useMouseSlider = () => {
    const ref = useRef<HTMLUListElement>(null);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    useEffect(() => {
        if (!ref.current) return;
        const windowMouseUpSubscribe = windowMouseUp.subscribe((event) => {
            if (!isMouseDown) return;
            setIsMouseDown(false);
        });
        const windowMouseMoveSubscribe = windowMouseMove.subscribe((event) => {
            if (!isMouseDown || ref?.current?.matches(':hover')) {
                return;
            }
            if (!ref.current || !isMouseDown) return;
            ref.current.scrollLeft += event.movementX * -1;
            //console.log(event);
        });
        return () => {
            windowMouseMoveSubscribe.unsubscribe();
            windowMouseUpSubscribe.unsubscribe();
        };
    }, [ref, isMouseDown]);
    return {
        isMouseDown,
        setIsMouseDown,
        listRef: ref,
    };
};

export const useVisibleSliderPaging = () => {
    const ref = useRef<HTMLUListElement>(null);
    const { visibleObserver, visibleTarget } = useSliderItemVisible(ref);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    const [page, setPage] = useState<number>();
    const hanldeScrollIntoView = (visibleTarget: Element | undefined) => {
        if (
            !visibleTarget ||
            !(visibleTarget instanceof HTMLElement) ||
            !visibleTarget.dataset.inline
        )
            return;
        visibleTarget.scrollIntoView({
            behavior: 'smooth',
            inline: visibleTarget.dataset.inline as ScrollLogicalPosition,
        });
        if (!visibleTarget.dataset.page) return;
        setPage(parseInt(visibleTarget.dataset.page));
    };

    useEffect(() => {
        if (!ref.current) return;
        ref.current.onscrollend = (e) => {
            if (!isMouseDown) return;
            hanldeScrollIntoView(visibleTarget);
        };
        const windowMouseUpSubscribe = windowMouseUp.subscribe((event) => {
            if (!isMouseDown) return;
            setIsMouseDown(false);
            hanldeScrollIntoView(visibleTarget);
        });
        const windowMouseMoveSubscribe = windowMouseMove.subscribe((event) => {
            if (
                !isMouseDown ||
                !visibleTarget ||
                ref?.current?.matches(':hover')
            ) {
                return;
            }
            if (!ref.current || !isMouseDown) return;
            ref.current.scrollLeft += event.movementX * -1;
            //console.log(event);
        });
        return () => {
            windowMouseMoveSubscribe.unsubscribe();
            windowMouseUpSubscribe.unsubscribe();
        };
    }, [ref, visibleTarget, isMouseDown]);

    return {
        isMouseDown,
        setIsMouseDown,
        hanldeScrollIntoView,
        visibleObserver,
        visibleTarget,
        page,
        setPage,
        listRef: ref,
    };
};
