import { windowResize } from '@handler/globalEvents';
import { useEffect, useRef, useState } from 'react';

export const useHeight = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>();

    useEffect(() => {
        if (!ref.current) return;
        const childrenChangeObserver = new MutationObserver(
            (mutationList, observer) => {
                mutationList.forEach((mutation) => {
                    if (!ref.current || !height) return;
                    const newHeight =
                        ref.current.getBoundingClientRect().height;
                    if (newHeight === height) return;
                    setHeight(newHeight);
                });
            },
        );
        childrenChangeObserver.observe(ref.current, {
            childList: true,
            subtree: true,
        });
        setHeight(ref.current.getBoundingClientRect().height);
        const subscribe = windowResize.subscribe((ev) => {
            if (!ref.current) return;
            setHeight(ref.current.getBoundingClientRect().height);
        });
        return () => {
            subscribe.unsubscribe();
        };
    }, [ref]);

    return { ref, height };
};
export const useFirstChildHeight = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [heights, setHeights] = useState<Array<number>>();

    useEffect(() => {
        if (!ref.current) return;
        const childrenChangeObserver = new MutationObserver(
            (mutationList, observer) => {
                mutationList.forEach((mutation) => {
                    if (!ref.current || !heights) return;
                    const newHeight =
                        ref.current.getBoundingClientRect().height;
                    if (newHeight === heights[0]) return;
                    setHeights([
                        newHeight,
                        ref.current.children[0].getBoundingClientRect().height,
                    ]);
                });
            },
        );
        childrenChangeObserver.observe(ref.current, {
            childList: true,
            subtree: true,
        });
        setHeights([
            ref.current.getBoundingClientRect().height,
            ref.current.children[0].getBoundingClientRect().height,
        ]);
        const subscribe = windowResize.subscribe((ev) => {
            if (!ref.current) return;
            setHeights([
                ref.current.getBoundingClientRect().height,
                ref.current.children[0].getBoundingClientRect().height,
            ]);
        });
        return () => {
            subscribe.unsubscribe();
            childrenChangeObserver.disconnect();
        };
    }, [ref]);
    return { ref, heights };
};
