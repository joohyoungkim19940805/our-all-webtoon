import { FlexLayout } from '@wrapper/FlexLayout';
import { Bottom } from '@wrapper/layout/page/Bottom';
import { Center } from '@wrapper/layout/page/Center';
import { Top } from '@wrapper/layout/page/Top';
import { createRoot } from 'react-dom/client';
import styles from './index.module.css';
import { GlobalDimLayer } from '@wrapper/layer/GlobalDimLayer';
import {
    createBrowserRouter,
    Route,
    RouterProvider,
    Routes,
    useRoutes,
} from 'react-router-dom';
import React from 'react';
import { Head } from '@wrapper/layout/dashboard/Head';
import { Body } from '@wrapper/layout/dashboard/Body';
import { windowResize } from '@handler/globalEvents';
import { GlobalBottomLayer } from '@wrapper/layer/GlobalBottomLayer';
styles;
FlexLayout;

const html = document.body.parentElement;
const covertFontSize = (html: HTMLElement) => {
    //크기별로 100 나누기 200 나누기 300 나누기 순차적으로 가야함 --내일 수정 예정-- //2024 07 14
    if (window.innerWidth <= 500) {
        html.style.fontSize = 25 / (window.innerWidth / 200) + 'px';
    } else if (window.innerWidth >= 501 && window.innerWidth >= 900) {
        html.style.fontSize = 25 / (window.innerWidth / 600) + 'px';
    } else {
        html.style.fontSize = 25 / (window.innerWidth / 300) + 'px';
    }
};
if (html) {
    covertFontSize(html);
    windowResize.subscribe(() => {
        covertFontSize(html);
    });
}
const root = document.createElement('main');
root.id = styles.root;

document.body.append(root);

const main = createRoot(root);
//head, body(<flex-layout>lnb, content</flex-layout>)
const router = createBrowserRouter([
    {
        path: '/dashboard/*',
        index: true,
        element: (
            <>
                <flex-layout
                    id={`${styles['root-dashboard']}`}
                    data-direction="column"
                >
                    <Head></Head>
                    <Body></Body>
                </flex-layout>
                <GlobalDimLayer></GlobalDimLayer>
                <GlobalBottomLayer></GlobalBottomLayer>
            </>
        ),
    },
]);
//
//
main.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
/*
main.render(
    <>
        <flex-layout data-direction="column">
            <Top></Top>
            <Center></Center>
            <Bottom></Bottom>
        </flex-layout>
        <GlobalDimLayer></GlobalDimLayer>
    </>,
);
*/
