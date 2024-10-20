import { FlexLayout } from '@component/FlexLayout';
import { GlobalBottomLayer } from '@component/layer/GlobalBottomLayer';
import { GlobalDimLayer } from '@component/layer/GlobalDimLayer';
import { Body } from '@component/layout/dashboard/Body';
import { Head } from '@component/layout/dashboard/Head';
import { windowResize } from '@handler/globalEvents';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styles from './index.module.css';
styles;
FlexLayout;

const html = document.body.parentElement;

const covertFontSize = async (html: HTMLElement) => {
    return new Promise<undefined | number>(resolve => {
        let lastFontSizeResult: undefined | number = undefined;
        for (let i = 100, len = window.innerWidth + 100; i < len; i += 100) {
            if (window.innerWidth <= i) {
                lastFontSizeResult = Math.max(
                    10,
                    25 / (window.innerWidth / (i * 0.4))
                );
                html.style.fontSize = lastFontSizeResult + 'px';
            }
        }
        resolve(lastFontSizeResult);
    });
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
    </React.StrictMode>
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
