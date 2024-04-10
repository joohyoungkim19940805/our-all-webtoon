import { RecommendContainer } from '@container/recommend/RecommendContainer';
import { SearchAndMenuContainer } from '@container/search/SearchAndMenuContainer';
import styles from './top.module.css';
import common from '@handler/common';
import { windowResize } from '@handler/globalEvents';
import { FlexContainer } from '@wrapper/FlexLayout';
import { useEffect, useRef } from 'react';
import { Observable, from, map, zip } from 'rxjs';
import { useHeight } from '@handler/hooks/SizeChangeHooks';

export const Top = () => {
    const topRef = useRef<FlexContainer>(null);
    const { ref: searchAndMenuRef, height: searchAndMenuHeight } = useHeight();
    const { ref: recommendRef, height: recommendHeight } = useHeight();
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
    }, [topRef, searchAndMenuHeight, recommendHeight]);
    return (
        <flex-container
            ref={topRef}
            data-grow={0.09}
            data-is_resize={true}
            data-panel_mode="center-cylinder-reverse"
        >
            <div className={styles['head-container']}>
                <RecommendContainer ref={recommendRef}></RecommendContainer>
                <SearchAndMenuContainer
                    ref={searchAndMenuRef}
                ></SearchAndMenuContainer>
            </div>
        </flex-container>
    );
};
/*
const $top: Observable<FlexContainer> = from(
    new Promise<FlexContainer>((res) => {
        let top = new FlexContainer();
        top.dataset.grow = '0.09';
        top.dataset.is_resize = 'false';
        top.panelMode = 'center-cylinder-reverse';
        res(top);
    }),
);
*/
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
