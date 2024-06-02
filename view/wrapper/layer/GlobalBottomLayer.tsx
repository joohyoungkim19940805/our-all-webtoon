import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styles from './GlobalBottomLayer.module.css';
import { PaintingAddContainer } from '@container/painting/PaintingListContainer';
import { $pageChange } from '@handler/subject/PageChangeAnimationEvent';
import { filter } from 'rxjs';

export const GlobalBottomLayer = () => {
    const layerRef = useRef<HTMLDivElement>(null);
    const layerContainerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const subscribe = $pageChange
            .pipe(
                filter(({ emissionDirection }) => emissionDirection === 'out'),
            )
            .subscribe((event) => {
                if (
                    event.url.pathname === location.pathname &&
                    event.isBack === true &&
                    layerContainerRef.current
                ) {
                    layerContainerRef.current.classList.remove(styles.open);
                    $pageChange.next({
                        url: event.url,
                        isBack: true,
                        emissionDirection: 'in',
                    });
                } else if (!event.isBack) {
                    navigate(event.url.pathname + event.url.search);
                }
            });
        return () => {
            subscribe.unsubscribe();
        };
    });
    useEffect(() => {
        if (location.pathname.includes('/page/bottom')) {
            setIsOpen(true);
            setTimeout(() => {
                if (!layerContainerRef.current) return;
                layerContainerRef.current.classList.add(styles.open);
            }, 10);
        } else {
            if (!layerContainerRef.current) return;
            if (layerContainerRef.current.classList.contains(styles.open)) {
                layerContainerRef.current.classList.remove(styles.open);
            } else {
                setIsOpen(false);
            }
        }
    }, [isOpen, location, layerContainerRef]);
    return (
        <>
            {isOpen && (
                <div
                    style={{
                        bottom: `${new URLSearchParams(location.search).get('positionHeight') || 0}px`,
                    }}
                    className={`${styles.layer}`}
                    ref={layerRef}
                    onClick={(event) => {
                        if (
                            !layerRef.current ||
                            event.nativeEvent.composedPath()[0] !==
                                layerRef.current ||
                            !layerContainerRef.current?.classList.contains(
                                styles.open,
                            )
                        )
                            return;
                        $pageChange.next({
                            url: new URL('', window.location.origin),
                            isBack: true,
                            emissionDirection: 'in',
                        });
                        layerContainerRef.current.classList.remove(styles.open);
                    }}
                >
                    <div
                        className={`${styles['layer-container']}`}
                        ref={layerContainerRef}
                        onTransitionEnd={(ev) => {
                            if (!layerContainerRef.current) return;
                            if (
                                !layerContainerRef.current.classList.contains(
                                    styles.open,
                                )
                            ) {
                                //setIsOpen(false);
                                history.back();
                            }
                        }}
                    >
                        <Routes>
                            <Route
                                path={`/bottom/start-painting-menu`}
                                element={
                                    <PaintingAddContainer></PaintingAddContainer>
                                }
                            ></Route>
                        </Routes>
                    </div>
                </div>
            )}
        </>
    );
};
