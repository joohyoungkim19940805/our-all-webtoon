import { LatestWebttonContainer } from '@component/webtoon/LatestWebtoonContainer';
import { Route, Routes } from 'react-router-dom';
import styles from './Center.module.css';

export const Center = () => {
    return (
        <flex-container data-is_resize={true} data-panel_mode="center-cylinder">
            <div className={styles['center-container']}>
                <Routes>
                    <Route
                        path="/*"
                        element={
                            <LatestWebttonContainer></LatestWebttonContainer>
                        }
                    />
                    <Route
                        path="/my-home"
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
