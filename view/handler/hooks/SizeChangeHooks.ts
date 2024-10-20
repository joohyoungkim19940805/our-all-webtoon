import { windowResize } from '@handler/globalEvents';
import { useEffect, useRef, useState } from 'react';

export const useSize = <T extends HTMLElement>(
    sizeName: 'height' | 'width'
) => {
    const ref = useRef<T>(null);
    const [size, setSize] = useState<number>();
    useEffect(() => {
        if (!ref.current) return;
        setSize(ref.current.getBoundingClientRect()[sizeName as keyof DOMRect]);
        const childrenChangeObserver = new MutationObserver(
            (mutationList, observer) => {
                mutationList.forEach(mutation => {
                    if (!ref.current || !size) return;
                    const newSize =
                        ref.current.getBoundingClientRect()[
                            sizeName as keyof DOMRect
                        ];
                    if (
                        newSize === size ||
                        Math.abs((newSize as number) - size) < 5
                    )
                        return;
                    setSize(newSize);
                });
            }
        );
        childrenChangeObserver.observe(ref.current, {
            childList: true,
            subtree: true,
        });

        const subscribe = windowResize.subscribe(ev => {
            if (!ref.current) return;
            setSize(
                ref.current.getBoundingClientRect()[sizeName as keyof DOMRect]
            );
        });
        return () => {
            subscribe.unsubscribe();
            //childrenChangeObserver.disconnect();
        };
    });

    return { ref, size };
};
export const useFirstChildSize = <T extends HTMLElement>(sizeName: string) => {
    const ref = useRef<T>(null);
    const [sizes, setSizes] = useState<Array<number>>();

    useEffect(() => {
        if (!ref.current || !ref.current.children[0]) return;
        const childrenChangeObserver = new MutationObserver(
            (mutationList, observer) => {
                mutationList.forEach(mutation => {
                    if (!ref.current || !sizes || !ref.current.children[0])
                        return;
                    const newSize = ref.current.getBoundingClientRect()[
                        sizeName as keyof DOMRect
                    ] as number;
                    //if (newSize === sizes[0]) return;
                    setSizes([
                        newSize,
                        ref.current.children[0].getBoundingClientRect()[
                            sizeName as keyof DOMRect
                        ] as number,
                    ]);
                });
            }
        );
        childrenChangeObserver.observe(ref.current, {
            childList: true,
            subtree: true,
        });
        setSizes([
            ref.current.getBoundingClientRect()[
                sizeName as keyof DOMRect
            ] as number,
            ref.current.children[0].getBoundingClientRect()[
                sizeName as keyof DOMRect
            ] as number,
        ]);
        const subscribe = windowResize.subscribe(ev => {
            if (!ref.current || !ref.current.children[0]) return;
            setSizes([
                ref.current.getBoundingClientRect()[
                    sizeName as keyof DOMRect
                ] as number,
                ref.current.children[0].getBoundingClientRect()[
                    sizeName as keyof DOMRect
                ] as number,
            ]);
        });
        return () => {
            subscribe.unsubscribe();
            childrenChangeObserver.disconnect();
        };
    }, [ref]);
    return { ref, sizes };
};
