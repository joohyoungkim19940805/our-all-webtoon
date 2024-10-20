import { FlexContainer } from '@component/FlexLayout';
import { DashboardDetailLnb } from '@component/lnb/DashboardDetailLnb';
import { DashboardLnb } from '@component/lnb/DashboardLnb';
import { useSize } from '@handler/hooks/SizeChangeHooks';
import { $lnbOpenClick } from '@handler/subject/LnbEvent';
import { useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';

export const Lnb = () => {
    const lnbWrapeerRef = useRef<FlexContainer>(null);
    const { ref: lnbRef, size } = useSize<HTMLUListElement>('width');
    useEffect(() => {
        if (!lnbWrapeerRef.current || !lnbRef.current) return;
        if (lnbWrapeerRef.current.getRoot) {
            lnbWrapeerRef.current.dataset.prev_grow =
                lnbWrapeerRef.current.getRoot
                    .mathGrow(lnbRef.current.getBoundingClientRect().width)
                    .toString();
        }
        const subscribe = $lnbOpenClick.subscribe({
            next: ev => {
                if (!lnbWrapeerRef.current) return;

                if (!lnbWrapeerRef.current.isVisible()) {
                    lnbWrapeerRef.current.openFlex({ isPrevSizeOpen: true });
                } else {
                    lnbWrapeerRef.current.closeFlex();
                }
            },
        });
        return () => {
            subscribe.unsubscribe();
        };
    }, [lnbWrapeerRef, lnbRef]);
    useEffect(() => {
        if (!lnbWrapeerRef.current || !lnbWrapeerRef.current.getRoot || !size)
            return;
        lnbWrapeerRef.current.style.maxWidth = size + 'px';
        // lnbWrapeerRef.current.dataset.grow = lnbWrapeerRef.current.getRoot
        //     .mathGrow(size)
        //     .toString();
    }, [lnbWrapeerRef, lnbRef, size]);
    return (
        <flex-container
            data-is_resize={true}
            data-grow={0}
            data-panel_mode="default"
            ref={lnbWrapeerRef}
        >
            <Routes>
                <Route
                    path="/*"
                    element={<DashboardLnb ref={lnbRef}></DashboardLnb>}
                ></Route>
                <Route
                    path="/detail/*"
                    element={
                        <DashboardDetailLnb ref={lnbRef}></DashboardDetailLnb>
                    }
                ></Route>
            </Routes>
        </flex-container>
    );
};
