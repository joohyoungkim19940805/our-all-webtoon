import { Input } from '@components/input/Input';
import { Observable, from, map, mergeMap, toArray, zip } from 'rxjs';
import { Genre } from '@type/GenreType';
import styles from './GenreListContainer.module.css';
import scrollStyles from '@root/listScroll.module.css';
import { useEffect, useRef, useState } from 'react';
import { useShiftDownScrollWheelX } from '@handler/hooks/ScrollHooks';
import { windowMouseMove, windowMouseUp } from '@handler/globalEvents';
import { useMouseSlider } from '@handler/hooks/SliderHooks';

const testData = [
    '로맨스',
    '판타지',
    '이세계',
    '전생',
    '드라마',
    '액션',
    '학원',
    '추리',
    '시대/전기',
    '다큐멘터리',
    '사극',
    '중세',
    '무협',
    '스릴러',
    '스포츠',
    '먹방',
    '러브코미디',
    '개그',
    '일상',
    '음악',
    'SF',
    'BL',
    '백합',
    '호러',
    '공포',
    '19',
];

//hooks로 분리, subject로 selectedMap(또는 배열?) 값 연결
export const useGenreChange = () => {
    const [selectedMap, setSelectedMap] = useState<Map<string, string>>(
        new Map(),
    );
    const addGenre = (genre: Genre) => {
        setSelectedMap((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(genre.name, genre.name);
            return newMap;
        });
    };
    const removeGenre = (genre: Genre) => {
        setSelectedMap((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.delete(genre.name);
            return newMap;
        });
    };
    return { selectedMap, addGenre, removeGenre };
};

type GenreListContainerProps = {
    genreList: Genre[];
    genreItemType: 'radio' | 'checkbox';
    id: string;
};
export const GenreListContainer = ({
    genreList,
    genreItemType,
    id,
}: GenreListContainerProps) => {
    const { isMouseDown, setIsMouseDown, listRef } = useMouseSlider();
    const { isShft } = useShiftDownScrollWheelX(listRef);
    const { addGenre, removeGenre } = useGenreChange();

    return (
        <div className={`${styles['genre-list-container']}`}>
            <ul
                id={id}
                ref={listRef}
                onMouseDown={(event) => setIsMouseDown(true)}
                onMouseMove={(event) => {
                    if (!listRef.current || !isMouseDown) return;
                    listRef.current.scrollLeft += event.movementX * -1;
                }}
                onMouseUp={(event) => {
                    setIsMouseDown(false);
                }}
                onWheel={(event) => {
                    if (!listRef.current || isShft) return;
                    const { deltaY } = event;
                    listRef.current.scrollTo(
                        listRef.current.scrollLeft + deltaY,
                        0,
                    );
                }}
                className={`${styles['genre-list']} ${scrollStyles['list-scroll']} ${scrollStyles.x} ${scrollStyles.none}`}
            >
                {genreList.map((genre, i) => (
                    <li className={styles['genre-list-item']} key={i}>
                        <input
                            type={genreItemType}
                            id={`${id}_${i}`}
                            name="genre-list"
                            hidden={true}
                            onChange={(event) => {
                                if (!event.target.checked) {
                                    removeGenre(genre);
                                    return;
                                }
                                new Promise<void>((res) => {
                                    event.target.closest('li')?.scrollIntoView({
                                        behavior: 'smooth',
                                        inline: 'center',
                                    });
                                    res();
                                });
                                addGenre(genre);
                            }}
                        />
                        <label htmlFor={`${id}_${i}`}>{genre.name}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};
