import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import styles from './GlobalBottomLayer.module.css';
import { PaintingAddContainer } from '@container/webtoon/PaintingAddContainer';

export const GlobalBottomLayer = () => {
    const layerRef = useRef<HTMLDivElement>(null);
    const layerContainerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes('/page/bottom')) {
            setIsOpen(true);
            setTimeout(() => {
                if (!layerContainerRef.current) return;
                layerContainerRef.current.classList.add(styles.open);
            }, 10);
        } else {
            if (!layerContainerRef.current) return;
            layerContainerRef.current.classList.remove(styles.open);
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
                        history.back();
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
                                setIsOpen(false);
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
