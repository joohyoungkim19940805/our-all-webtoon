import { Observable, from, map, zip } from 'rxjs';
import { FlexContainer, FlexLayout } from '@wrapper/FlexLayout';
import styles from './Center.module.css';
import { AdsContainer } from '@container/ads/AdsContainer';
import { GenreListContainer } from '@container/genre/GenreListContainer';
import { Genre } from '@type/GenreType';
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
export const Center = () => {
    return (
        <flex-container data-is_resize="true" data-panel_mode="center-cylinder">
            <flex-layout>
                <flex-container data-is_resize="true">
                    <div className={styles['center-container']}>
                        <AdsContainer></AdsContainer>
                        <div className={styles['genre-container']}>
                            <GenreListContainer
                                genreList={testData}
                                genreItemType="checkbox"
                                id="main-genre-list"
                            ></GenreListContainer>
                        </div>
                        <div></div>
                    </div>
                </flex-container>
                <flex-container
                    data-is_resize="false"
                    data-grow="0"
                ></flex-container>
                <flex-container
                    data-is_resize="false"
                    data-grow="0"
                ></flex-container>
            </flex-layout>
        </flex-container>
    );
};

//top(head), body(content)
/*
const $center: Observable<FlexContainer> = from(
    new Promise<FlexContainer>((res) => {
        let center = new FlexContainer({ textContent: '???' });
        center.style.minHeight = '1px';
        center.dataset.is_resize = 'true';
        center.panelMode = 'center-cylinder';
        res(center);
    }),
);

export const center = zip($center).pipe(
    map(([center]) => {
        //bottom.append(gnbContainer)
        return { center };
    }),
);
*/
