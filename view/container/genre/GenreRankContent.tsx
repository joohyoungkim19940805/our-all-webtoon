import { handleScrollWheelX } from '@handler/handleScrollX';
import styles from './GenreRankContent.module.css';
import scrollStyles from '@root/listScroll.module.css';
import { useEffect, useRef, useState } from 'react';
import { documentKeyDown, documentKeyUp } from '@handler/globalEvents';

const testData = [
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
    useEffect(() => {
        if (!ref.current) return;
        const keyDownSubscribe = documentKeyDown.subscribe((event) => {
            if (
                !ref.current ||
                event.key !== 'Shift' ||
                !ref.current.hasAttribute('data-is_shft')
            )
                return;
            ref.current.dataset.is_shft = '';
        });
        const keyUpSubscribe = documentKeyUp.subscribe((event) => {
            if (
                !ref.current ||
                event.key !== 'Shift' ||
                ref.current.hasAttribute('data-is_shft')
            )
                return;
            ref.current.removeAttribute('data-is_shft');
        });

        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach((entry) => {
                    console.log(entry);
                }),
            {
                root: ref.current,
                threshold: 0.1,
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
            keyUpSubscribe.unsubscribe();
            keyDownSubscribe.unsubscribe();
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, [ref]);

    return (
        <div>
            <ul
                onWheel={(event) => handleScrollWheelX(event, ref)}
                ref={ref}
                className={`${styles['genre-rank-list-container']} ${scrollStyles['list-scroll']} ${scrollStyles.x} ${scrollStyles.none}`}
            >
                {testData.map((e, i) => {
                    return (
                        <li
                            className={styles['genre-rank-list-item']}
                            key={i}
                            ref={
                                i == 0 //|| (i + 1) % 4 === 0
                                    ? (node) => {
                                          if (!node || !observer) return;
                                          observer.observe(node);
                                      }
                                    : null
                            }
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
