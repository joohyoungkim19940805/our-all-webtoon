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
    genreItemType: 'radio' | 'checbox';
};
export const GenreListContainer = ({
    genreList,
    genreItemType,
}: GenreListContainerProps) => {
    const ref = useRef<HTMLUListElement>(null);
    const { isShft, keyDownSubscribe, keyUpSubscribe } =
        useShiftDownScrollWheelXState();
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    useEffect(() => {
        if (!ref.current) return;
        /*ref.current.onscrollend = (e) => {
            if (
                isMouseDown ||
                !visibleTarget ||
                !(visibleTarget instanceof HTMLElement) ||
                !visibleTarget.dataset.inline
            )
                return;
            visibleTarget.scrollIntoView({
                behavior: 'smooth',
                inline: visibleTarget.dataset.inline as ScrollLogicalPosition,
            });
        };*/
        const windowMouseUpSubscribe = windowMouseUp.subscribe((event) => {
            if (!isMouseDown == false) return;
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
        <ul
            ref={ref}
            onMouseDown={(event) => setIsMouseDown(true)}
            onMouseMove={(event) => {
                handleMouseMoveScrollWheelX(event, ref, isMouseDown);
            }}
            onMouseUp={(event) => {
                setIsMouseDown(false);
            }}
            onWheel={(event) => handleScrollWheelX(event, ref, isShft)}
            className={`${styles['genre-list-container']} ${scrollStyles['list-scroll']} ${scrollStyles.x} ${scrollStyles.none}`}
        >
            {genreList.map((genre, i) => (
                <GenreItem
                    key={i}
                    type={genreItemType}
                    index={i}
                    genre={genre}
                ></GenreItem>
            ))}
        </ul>
    );
};

type GenreItemProps = {
    type: 'radio' | 'checbox';
    index: number;
    genre: Genre;
};
export const GenreItem = ({ type, index, genre }: GenreItemProps) => {
    return (
        <li className={styles['genre-list-item']}>
            <Input
                type={type}
                id={`genre-list-item_${index}`}
                name="genre-list"
                hidden={true}
                textContent={genre.name}
            ></Input>
        </li>
    );
};

/*
export const genreListContainer = (
    genreList: Genre[],
    genreItemType: GenreItemType,
) => {
    const ul = Object.assign(document.createElement('ul'), {
        className: styles['genre-list-container'],
    });
    return zip(
        genreList.map((e, i) => {
            return genreItem(genreItemType, i, e);
        }),
    ).pipe(
        mergeMap((e) => e),
        toArray(),
        map((liList) => {
            ul.replaceChildren(...liList);
            return { genreListContainer: ul, components: liList };
        }),
    );
};
*/
/*
export const genreItem = (
    { type }: GenreItemType,
    index: number,
    genre: Genre,
) => {
    return input(
        {
            type,
            data: {
                genre_name: genre.name,
            },
            id: `genre-list-item_${index}`,
            name: 'genre-list',
            hidden: true,
        },
        {},
    ).pipe(
        map((input) => {
            input.classList.add(styles['genre-list-item-input']);
            let li = Object.assign(document.createElement('li'), {
                className: styles['genre-list-item'],
            });
            let label = Object.assign(document.createElement('label'), {
                textContent: input.dataset.genre_name,
                className: styles['genre-list-item-label'],
            });
            label.setAttribute('for', input.id);
            //label.prepend(e);
            li.append(input, label);
            return li;
        }),
    );
};
*/
