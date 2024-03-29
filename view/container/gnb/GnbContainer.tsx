import styles from './GnbContainer.module.css';
import { Button } from '@components/button/Button';

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

import { MyHomeButton } from '@components/button/fragments/MyHomeButton';
import {
    LatestUpdateButton,
    latestUpdateButtonEvent,
} from '@components/button/fragments/LatestUpdateButton';
import {
    WebtoonListButton,
    webtoonListButtonEvent,
} from '@components/button/fragments/WebtoonListButton';
import {
    PaintingAddButton,
    paintingAddButtonEvent,
} from '@components/button/fragments/PaintingAddButton';
import {
    NoticeBoardButton,
    noticeBoardButtonEvent,
} from '@components/button/fragments/NoticeBoardButton';
import { BookMarkButtonButton } from '@components/button/fragments/BookMarkButton';
import { CalendarButton } from '@components/button/fragments/CalendarButton';
import { CartButton } from '@components/button/fragments/CartButton';
import { TvButton } from '@components/button/fragments/TvButton';
import { useEffect, useRef, useState } from 'react';

const gnbRef = useRef<HTMLDivElement>(null);

export const useHeightState = () => {
    const [heights, setHeights] = useState<Array<number>>();
    useEffect(() => {
        if (!gnbRef.current) return;

        setHeights([
            gnbRef.current.clientHeight,
            gnbRef.current.children[0].clientHeight,
        ]);
    }, [gnbRef]);

    return { heights };
};

//gnbContainer를 div로 바꿔보기 2024 03 07
export const GnbContainer = () => {
    return (
        <div ref={gnbRef} className={styles['gnb-container']}>
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
};