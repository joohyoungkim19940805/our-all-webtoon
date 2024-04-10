import styles from './GnbContainer.module.css';

import {
    Subject,
    concat,
    from,
    fromEvent,
    map,
    merge,
    mergeMap,
    zip,
} from 'rxjs';

import { MyHomeButton } from '@components/button/MyHomeButton';
import {
    LatestUpdateButton,
    latestUpdateButtonEvent,
} from '@components/button/LatestUpdateButton';
import {
    WebtoonListButton,
    webtoonListButtonEvent,
} from '@components/button/WebtoonListButton';
import {
    PaintingAddButton,
    paintingAddButtonEvent,
} from '@components/button/PaintingAddButton';
import {
    NoticeBoardButton,
    noticeBoardButtonEvent,
} from '@components/button/NoticeBoardButton';
import { BookMarkButtonButton } from '@components/button/BookMarkButton';
import { CalendarButton } from '@components/button/CalendarButton';
import { CartButton } from '@components/button/CartButton';
import { TvButton } from '@components/button/TvButton';
import React, {
    LegacyRef,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from 'react';
import { windowResize } from '@handler/globalEvents';
import buttonStyle from '@components/button/Button.module.css';

/*type GnbContainerProps = {
    ref: LegacyRef<HTMLDivElement>; // Add the ref prop
};*/
//ul로 바꿔보기 2024 03 29
export const GnbContainer = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref} className={styles['gnb-container']}>
            <LatestUpdateButton></LatestUpdateButton>
            <WebtoonListButton></WebtoonListButton>
            <PaintingAddButton></PaintingAddButton>
            <NoticeBoardButton></NoticeBoardButton>
            <MyHomeButton></MyHomeButton>
            <BookMarkButtonButton></BookMarkButtonButton>
            <CalendarButton></CalendarButton>
            <CartButton></CartButton>
            <TvButton></TvButton>
        </div>
    );
});
