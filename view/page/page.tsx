import { FlexLayout } from '@component/FlexLayout';
import ConvertFontSize from '@component/FontSizeProvider';
import { GlobalBottomLayer } from '@component/layer/GlobalBottomLayer';
import { GlobalDimLayer } from '@component/layer/GlobalDimLayer';
import { Bottom } from '@component/layout/page/Bottom';
import { Center } from '@component/layout/page/Center';
import { Top } from '@component/layout/page/Top';
import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styles from './index.module.css';
styles;
FlexLayout;
document.body.dataset.mode = 'black';
const root = document.createElement('main');
root.id = styles.root;

document.body.append(root);

const main = createRoot(root);
const theme = createTheme({
    palette: {
        mode: 'dark', // 다크 모드 설정
    },
});
const router = createBrowserRouter([
    {
        path: '/page/*',
        index: true,
        element: (
            <>
                <ConvertFontSize></ConvertFontSize>
                <ThemeProvider theme={theme}>
                    <flex-layout data-direction="column">
                        <Top></Top>
                        <Center></Center>
                        <Bottom></Bottom>
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
