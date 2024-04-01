import { from, map, mergeMap, of, toArray, zip } from 'rxjs';
import styles from './RecommendContainer.module.css';
import { SearchAndMenuContainer } from '@container/search/SearchAndMenuContainer';
import { GenreListContainer } from '@container/genre/GenreListContainer';
import { Genre } from '@type/GenreType';
import { forwardRef, useEffect, useRef, useState } from 'react';
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

export const useRecommendHeight = () => {
    const recommendRef = useRef<HTMLDivElement>(null);
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

    return { recommendRef, height };
};
export const RecommendContainer = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div className={`${styles['recommend-container']}`} ref={ref}>
            <GenreListContainer
                genreList={testData}
                genreItemType="radio"
            ></GenreListContainer>
        </div>
    );
});
