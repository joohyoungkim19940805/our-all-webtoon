import {
    HeadContainer,
    useHeightState as useRecommendHeightState,
} from '@container/head/HeadContainer';
import { useHeightState as useSearchAndMenuHeightState } from '@container/search/SearchAndMenuContainer';

import common from '@handler/common';
import { windowResize } from '@handler/globalEvents';
import { FlexContainer } from '@wrapper/FlexLayout';
import { useEffect, useRef } from 'react';
import { Observable, from, map, zip } from 'rxjs';
//탑이 광고역할 및 검색 역할 드가야함

export const Top = () => {
    const topRef = useRef<FlexContainer>(null);
    const { height: searchAndMenuHeight } = useSearchAndMenuHeightState();
    const { height: recommendHeight } = useRecommendHeightState();
    useEffect(() => {
        if (
            !topRef.current ||
            !searchAndMenuHeight ||
            !recommendHeight ||
            !topRef.current.getRoot
        )
            return;

        topRef.current.style.maxHeight =
            recommendHeight + searchAndMenuHeight + 'px';
        topRef.current.dataset.grow = topRef.current.getRoot
            .mathGrow(searchAndMenuHeight)
            .toString();
    }, [topRef]);
    return (
        <flex-container
            ref={topRef}
            data-grow="0.09"
            data-is_resize="false"
            data-panel_mode="center-cylinder-reverse"
        >
            <HeadContainer></HeadContainer>
        </flex-container>
    );
};

const $top: Observable<FlexContainer> = from(
    new Promise<FlexContainer>((res) => {
        let top = new FlexContainer();
        top.dataset.grow = '0.09';
        top.dataset.is_resize = 'false';
        top.panelMode = 'center-cylinder-reverse';
        res(top);
    }),
);
/*
export const top = zip($top, headContainer).pipe(
    map(
        ([
            top,
            { headContainer, recommendContainer, searchAndMenuContainer },
        ]) => {
            //bottom.append(gnbContainer)
            top.replaceChildren(headContainer);
            top.style.minHeight = searchAndMenuContainer.clientHeight + 'px';

            common.renderingAwait(searchAndMenuContainer).then(() => {
                const root = top.getRoot;
                if (!root) return;
                top.dataset.grow = root
                    .mathGrow(searchAndMenuContainer.clientHeight)
                    ?.toString();
                top.style.minHeight = '';
                top.style.maxHeight =
                    searchAndMenuContainer.clientHeight +
                    recommendContainer.clientHeight +
                    'px';
                root.remain();
            });
            windowResize.subscribe((ev) => {
                const root = top.getRoot;
                if (!root) return;
                top.style.maxHeight =
                    searchAndMenuContainer.clientHeight +
                    recommendContainer.clientHeight +
                    'px';
                top.dataset.grow = root
                    .mathGrow(searchAndMenuContainer.clientHeight)
                    ?.toString();
                root.remain();
            });
            return { top, headContainer };
        },
    ),
);
*/
