import { FlexLayout } from '@component/FlexLayout';
import ConvertFontSize from '@component/FontSizeProvider';
import { GlobalBottomLayer } from '@component/layer/GlobalBottomLayer';
import { GlobalDimLayer } from '@component/layer/GlobalDimLayer';
import { Body } from '@component/layout/dashboard/Body';
import { Head } from '@component/layout/dashboard/Head';
import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styles from './index.module.css';
styles;
FlexLayout;

const root = document.createElement('main');
root.id = styles.root;

document.body.append(root);

const main = createRoot(root);
const theme = createTheme({
    palette: {
        primary: {
            main: '#2e3b55', // 작가 대시보드의 색상
        },
        secondary: {
            main: '#ffcc80',
        },
        text: {
            primary: '#5b5b5b',
        },
    },
});
//head, body(<flex-layout>lnb, content</flex-layout>)
const router = createBrowserRouter([
    {
        path: '/dashboard/*',
        index: true,
        element: (
            <>
                <ConvertFontSize></ConvertFontSize>
                <ThemeProvider theme={theme}>
                    <flex-layout data-direction="column">
                        <Head></Head>
                        <Body></Body>
                    </flex-layout>
                    <GlobalDimLayer></GlobalDimLayer>
                    <GlobalBottomLayer></GlobalBottomLayer>
                </ThemeProvider>
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
