import { AdsContainer } from '@component/ads/AdsContainer';
import {
    GenreListContainer,
    useGenreChange,
} from '@component/genre/GenreListContainer';
import { WebtoonEpisodeList } from '@component/webtoon/WebtoonEpisodeList';
import { WebtoonFilterBar } from '@component/webtoon/WebtoonFilterBar';
import { Genre } from '@type/service/Genre';
import { useEffect } from 'react';

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
].map(e => {
    return { name: e } as Genre;
});

export const LatestWebttonContainer = () => {
    const { selectedMap } = useGenreChange();
    useEffect(() => {
        console.log(selectedMap);
    }, [selectedMap]);
    return (
        <>
            <AdsContainer></AdsContainer>
            <GenreListContainer
                genreList={testData}
                genreItemType="checkbox"
                id="main-genre-list"
            ></GenreListContainer>
            <WebtoonFilterBar></WebtoonFilterBar>
            <WebtoonEpisodeList></WebtoonEpisodeList>
        </>
    );
};
