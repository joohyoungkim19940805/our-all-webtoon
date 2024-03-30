import { from, map, mergeMap, of, toArray, zip } from 'rxjs';
import styles from './HeadContainer.module.css';
import { SearchAndMenuContainer } from '@container/search/SearchAndMenuContainer';
import { GenreListContainer } from '@container/genre/GenreListContainer';
import { Genre } from '@type/GenreType';
import { useEffect, useRef, useState } from 'react';
import { windowResize } from '@handler/globalEvents';

/*장르 목록 - 
로맨스, 판타지, 이세계, 전생, 드라마
액션, 학원, 추리, 시대/전기, 
사극, 중세, 무협, 스릴러, 스포츠, 먹방, 
러브코미디, 개그, 일상, 음악,
SF, BL, 백합, 호러, 공포, 19
*/
const testData: Genre[] = [
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
].map((e) => {
    return { name: e } as Genre;
});

const recommendRef = useRef<HTMLDivElement>(null);

export const useHeightState = () => {
    const [height, setHeight] = useState<number>();

    useEffect(() => {
        if (!recommendRef.current) return;
        setHeight(recommendRef.current.getBoundingClientRect().height);
    }, [recommendRef]);

    useEffect(() => {
        const subscribe = windowResize.subscribe((ev) => {
            if (!recommendRef.current) return;
            setHeight(recommendRef.current.getBoundingClientRect().height);
        });
        return () => {
            subscribe.unsubscribe();
        };
    });

    return { height };
};
export const RecommendContainer = () => {
    return (
        <div ref={recommendRef}>
            <GenreListContainer
                genreList={testData}
                genreItemType="radio"
            ></GenreListContainer>
        </div>
    );
};

export const HeadContainer = () => {
    return (
        <div className={styles['head-container']}>
            <RecommendContainer></RecommendContainer>
            <SearchAndMenuContainer></SearchAndMenuContainer>
        </div>
    );
};

/*
export const recommendContainer = (() => {
    let promise = new Promise<HTMLDivElement>((res) => {
        let container = Object.assign(document.createElement('div'), {});
        res(container);
    });
    return zip(
        from(promise),
        genreListContainer(testData, { type: 'radio' }),
    ).pipe(
        map(([recommendContainer, { genreListContainer, components }]) => {
            recommendContainer.replaceChildren(genreListContainer);
            return { recommendContainer, genreListContainer };
        }),
    );
})();
*/

/*
export const headContainer = (() => {
    let promise = new Promise<HTMLDivElement>((res) => {
        let div = Object.assign(document.createElement('div'), {
            className: styles['head-container'],
        });
        res(div);
    });
    return zip(from(promise), recommendContainer, searchAndMenuContainer).pipe(
        map(
            ([
                headContainer,
                { recommendContainer },
                { searchAndMenuContainer, components: searchAndMenuComponents },
            ]) => {
                headContainer.replaceChildren(
                    recommendContainer,
                    searchAndMenuContainer,
                );
                return {
                    headContainer,
                    recommendContainer,
                    searchAndMenuContainer,
                };
            },
        ),
    );
})();
*/
