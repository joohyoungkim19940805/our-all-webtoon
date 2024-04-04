import {
    handleMouseMoveScrollWheelX,
    handleScrollWheelX,
    useShiftDownScrollWheelXState,
} from '@handler/handleScrollX';
import styles from './GenreRankContent.module.css';
import scrollStyles from '@root/listScroll.module.css';
import React, { useEffect, useRef, useState } from 'react';
import {
    documentKeyDown,
    documentKeyUp,
    windowMouseUp,
} from '@handler/globalEvents';

const testData = [
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
];
// top, bottom에 사이즈 조절 하는 부분 자식요소 추가 삭제시에도 동작하게끔 만들어야 함(MutationObserver)
export const GenreRankContainer = () => {
    const [observer, setObserver] = useState<IntersectionObserver>();

    const ref = useRef<HTMLUListElement>(null);
    const { isShft, keyDownSubscribe, keyUpSubscribe } =
        useShiftDownScrollWheelXState();
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const [visibleTarget, setVisibleTarget] = useState<Element>();
    useEffect(() => {
        if (!ref.current) return;
        let visibleTargetElement: Element | undefined = undefined;
        const windowMouseSubscribe = windowMouseUp.subscribe((event) => {
            setIsMouseDown(false);
            if (
                !visibleTargetElement ||
                !(visibleTargetElement instanceof HTMLElement) ||
                !visibleTargetElement.dataset.inline
            )
                return;
            visibleTargetElement.scrollIntoView({
                behavior: 'smooth',
                inline: visibleTargetElement.dataset
                    .inline as ScrollLogicalPosition,
            });
        });

        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    setVisibleTarget(entry.target);
                    visibleTargetElement = entry.target;
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
                        console.log(removedNode);
                        observer.unobserve(removedNode as Element);
                    });
                }
            });
        });
        mutationObserver.observe(ref.current, { childList: true });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
            keyUpSubscribe.unsubscribe();
            keyDownSubscribe.unsubscribe();
            windowMouseSubscribe.unsubscribe();
        };
    }, [ref]);
    // ${scrollStyles.none}
    return (
        <div>
            <ul
                onTouchEnd={(event) => {
                    if (
                        !visibleTarget ||
                        !(visibleTarget instanceof HTMLElement) ||
                        !visibleTarget.dataset.inline
                    )
                        return;
                    setTimeout(() => {
                        visibleTarget.scrollIntoView({
                            behavior: 'smooth',
                            inline: visibleTarget.dataset
                                .inline as ScrollLogicalPosition,
                        });
                    }, 10);
                }}
                onMouseUp={(event) => {
                    setIsMouseDown(false);
                    if (
                        !visibleTarget ||
                        !(visibleTarget instanceof HTMLElement) ||
                        !visibleTarget.dataset.inline
                    )
                        return;

                    visibleTarget.scrollIntoView({
                        behavior: 'smooth',
                        inline: visibleTarget.dataset
                            .inline as ScrollLogicalPosition,
                    });
                }}
                onMouseDown={(event) => setIsMouseDown(true)}
                onMouseMove={(event) =>
                    handleMouseMoveScrollWheelX(event, ref, isMouseDown)
                }
                onWheel={(event) => handleScrollWheelX(event, ref, isShft)}
                ref={ref}
                className={`${styles['genre-rank-list-container']} ${scrollStyles['list-scroll']} ${scrollStyles.x}`}
            >
                {testData.map((e, i) => {
                    return (
                        <li
                            className={styles['genre-rank-list-item']}
                            key={i}
                            ref={
                                (i + 1) % 3 === 0 || i % 3 === 0
                                    ? (node) => {
                                          if (!node || !observer) return;
                                          observer.observe(node);
                                      }
                                    : null
                            }
                            {...((i + 1) % 3 === 0
                                ? { ['data-inline']: 'end' }
                                : i % 3 === 0
                                  ? { ['data-inline']: 'start' }
                                  : {})}
                        >
                            <img src={e}></img>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export type GenreRankItemProps = {
    src: string;
    index: number;
};

export const GenreRankItem = ({ src, index }: GenreRankItemProps) => {
    return (
        <li className={styles['genre-rank-list-item']} key={index}>
            <img src={src}></img>
        </li>
    );
};
