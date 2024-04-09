import { useShiftDownScrollWheelXState } from '@handler/hooks/ScrollHooks';
import styles from './GenreRankContent.module.css';
import scrollStyles from '@root/listScroll.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { windowMouseMove, windowMouseUp } from '@handler/globalEvents';
import { useVisibleSliderPaging } from '@handler/hooks/SliderHooks';

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
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
];
// top, bottom에 사이즈 조절 하는 부분 자식요소 추가 삭제시에도 동작하게끔 만들어야 함(MutationObserver)
export const GenreRankContainer = () => {
    const {
        isMouseDown,
        setIsMouseDown,
        hanldeScrollIntoView,
        visibleObserver,
        visibleTarget,
        page,
        listRef,
    } = useVisibleSliderPaging();
    const { isShft, keyDownSubscribe, keyUpSubscribe } =
        useShiftDownScrollWheelXState();
    useEffect(() => {
        return () => {
            keyUpSubscribe.unsubscribe();
            keyDownSubscribe.unsubscribe();
        };
    }, [listRef]);
    // ${scrollStyles.none}
    return (
        <div className={`${styles['genre-rank-list-container']}`}>
            <ul
                onTouchEnd={(event) => {
                    setIsMouseDown(true);
                    hanldeScrollIntoView(visibleTarget);
                }}
                onMouseUp={(event) => {
                    setIsMouseDown(false);
                    hanldeScrollIntoView(visibleTarget);
                }}
                onMouseDown={(event) => setIsMouseDown(true)}
                onMouseMove={(event) => {
                    if (!listRef.current || !isMouseDown) return;
                    listRef.current.scrollLeft += event.movementX * -1;
                }}
                onWheel={(event) => {
                    if (!listRef.current || isShft) return;
                    const { deltaY } = event;
                    listRef.current.scrollTo(
                        listRef.current.scrollLeft + deltaY,
                        0,
                    );
                }}
                ref={listRef}
                className={`${styles['genre-rank-list']} ${scrollStyles['list-scroll']} ${scrollStyles.x} ${scrollStyles.none}`}
            >
                {testData.map((e, i) => {
                    return (
                        <li
                            data-page={
                                i % 3 == 0
                                    ? i / 3
                                    : (i + 1) % 3 == 0
                                      ? (i + 1) / 3 - 1
                                      : ''
                            }
                            className={styles['genre-rank-list-item']}
                            key={i}
                            ref={
                                (i + 1) % 3 === 0 || i % 3 === 0
                                    ? (node) => {
                                          if (!node || !visibleObserver) return;
                                          visibleObserver.observe(node);
                                      }
                                    : null
                            }
                            {...((i + 1) % 3 === 0
                                ? { ['data-inline']: 'end' }
                                : i % 3 === 0
                                  ? { ['data-inline']: 'start' }
                                  : {})}
                        >
                            <img src={e} draggable={false}></img>
                        </li>
                    );
                })}
            </ul>
            <ul className={`${styles['genre-rank-list-page']}`}>
                {[...new Array(Math.ceil(testData.length / 3))].map((_, i) => {
                    return (
                        <li
                            key={i}
                            className={
                                (i == 0 && page == undefined) ||
                                (page != undefined && i === page)
                                    ? styles['target-page']
                                    : ''
                            }
                        ></li>
                    );
                })}
            </ul>
        </div>
    );
};
