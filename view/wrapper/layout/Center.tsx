import { Observable, from, map, zip } from 'rxjs';
import { FlexContainer, FlexLayout } from '@wrapper/FlexLayout';
import styles from './Center.module.css';
import { AdsContainer } from '@container/ads/AdsContainer';
import { GenreListContainer } from '@container/genre/GenreListContainer';
import { Genre } from '@type/GenreType';
import { LatestWebttonContainer } from '@container/webtoon-list/LatestWebtoonContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const Center = () => {
    return (
        <flex-container data-is_resize={true} data-panel_mode="center-cylinder">
            <div className={styles['center-container']}>
                <Routes>
                    <Route
                        path="/main/*"
                        element={
                            <LatestWebttonContainer></LatestWebttonContainer>
                        }
                    />
                </Routes>
            </div>
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
