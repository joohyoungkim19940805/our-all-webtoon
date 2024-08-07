import { Lnb } from '@wrapper/layout/dashboard/Lnb';
import styles from './Body.module.css';
import { Route, Routes } from 'react-router-dom';
import { MyProfileContainer } from '@container/account/MyProfileContainer';
import { MyWebtoonListContainer } from '@container/dashboard/MyWebtoonListContainer';
import { PaintingWebtoonContainer } from '@container/painting/PaintingWebtoonContainer';

export const Body = () => {
    return (
        <flex-container data-is_resize={false} data-panel_mode="default">
            <flex-layout data-direction="row">
                <Lnb></Lnb>

                <flex-container data-is_resize={true} data-panel_mode="default">
                    <div className={styles['body-container']}>
                        <Routes>
                            <Route
                                path="/*"
                                element={
                                    <MyWebtoonListContainer></MyWebtoonListContainer>
                                }
                            ></Route>
                            <Route
                                path="/profile"
                                element={
                                    <MyProfileContainer></MyProfileContainer>
                                }
                            ></Route>
                            <Route
                                path="/painting"
                                element={
                                    <PaintingWebtoonContainer></PaintingWebtoonContainer>
                                }
                            ></Route>
                        </Routes>
                    </div>
                </flex-container>
            </flex-layout>
        </flex-container>
    );
};
