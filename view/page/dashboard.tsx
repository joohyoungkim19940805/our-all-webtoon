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
if (html) {
    html.style.fontSize = Math.max(0.5, 5 / (window.innerWidth / 200)) + 'vmax';
    windowResize.subscribe(() => {
        console.log(4.5 / (window.innerWidth / 200));
        html.style.fontSize =
            Math.max(0.5, 5 / (window.innerWidth / 200)) + 'vmax';
    });
}
document.body.dataset.mode = 'black';
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
                <flex-layout data-direction="column">
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
