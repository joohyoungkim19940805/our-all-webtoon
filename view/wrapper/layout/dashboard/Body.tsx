import { DashboardDetailLnb } from '@container/lnb/DashboardDetailLnb';
import { DashboardLnb } from '@container/lnb/DashboardLnb';
import { $lnbOpenClick } from '@handler/subject/LnbEvent';
import { FlexLayout, FlexContainer } from '@wrapper/FlexLayout';
import { useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
export const Body = () => {
    const lnbWrapeerRef = useRef<FlexContainer>(null);
    const lnbRef = useRef<HTMLUListElement>(null);
    useEffect(() => {
        if (!lnbWrapeerRef.current || !lnbRef.current) return;
        if (lnbWrapeerRef.current.getRoot) {
            lnbWrapeerRef.current.dataset.prev_grow =
                lnbWrapeerRef.current.getRoot
                    .mathGrow(lnbRef.current.getBoundingClientRect().width)
                    .toString();
        }
        const subscribe = $lnbOpenClick.subscribe({
            next: (ev) => {
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
    return (
        <flex-container data-is_resize={false} data-panel_mode="default">
            <flex-layout data-direction="row">
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
                                <DashboardDetailLnb
                                    ref={lnbRef}
                                ></DashboardDetailLnb>
                            }
                        ></Route>
                    </Routes>
                </flex-container>

                <flex-container
                    data-is_resize={true}
                    data-panel_mode="default"
                ></flex-container>
            </flex-layout>
        </flex-container>
    );
};
