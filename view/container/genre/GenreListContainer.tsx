import { Input } from '@components/input/Input';
import { Observable, from, map, mergeMap, toArray, zip } from 'rxjs';
import { Genre } from '@type/GenreType';
import styles from './GenreListContainer.module.css';
import scrollStyles from '@root/listScroll.module.css';
import { useEffect, useRef, useState } from 'react';
import {
    handleMouseMoveScrollWheelX,
    handleScrollWheelX,
    useShiftDownScrollWheelXState,
} from '@handler/handleScrollX';
import { windowMouseMove, windowMouseUp } from '@handler/globalEvents';

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
    const ref = useRef<HTMLUListElement>(null);
    const { isShft, keyDownSubscribe, keyUpSubscribe } =
        useShiftDownScrollWheelXState();
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
            handleMouseMoveScrollWheelX(event, ref, isMouseDown);
            //console.log(event);
        });
        return () => {
            windowMouseMoveSubscribe.unsubscribe();
            windowMouseUpSubscribe.unsubscribe();
        };
    }, [ref, isMouseDown]);

    return (
        <div className={`${styles['genre-list-container']}`}>
            <ul
                id={id}
                ref={ref}
                onMouseDown={(event) => setIsMouseDown(true)}
                onMouseMove={(event) => {
                    handleMouseMoveScrollWheelX(event, ref, isMouseDown);
                }}
                onMouseUp={(event) => {
                    setIsMouseDown(false);
                }}
                onWheel={(event) => handleScrollWheelX(event, ref, isShft)}
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
                                if (!event.target.checked) return;
                                event.target.closest('li')?.scrollIntoView({
                                    behavior: 'smooth',
                                    inline: 'center',
                                });
                            }}
                        />
                        <label htmlFor={`${id}_${i}`}>{genre.name}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};
