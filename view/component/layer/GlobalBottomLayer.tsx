import React, { useEffect, useRef, useState } from 'react';
import { Subject } from 'rxjs';
import styles from './GlobalBottomLayer.module.css';

export type GlobalBottomLayerType = {
    position?: DOMRect;
    openState: boolean;
    layerName: string;
    children?: React.ReactNode;
};

export const globalBottomLayerSubject = new Subject<GlobalBottomLayerType>();
export const globalBottomLayerCloseSubject = new Subject<string | null>();
export const GlobalBottomLayer = () => {
    const layerRef = useRef<HTMLDivElement>(null);
    const layerContainerRef = useRef<HTMLDivElement>(null);
    const [layerInfo, setLayerInfo] = useState<GlobalBottomLayerType | null>(
        null
    );

    useEffect(() => {
        const subscription = globalBottomLayerSubject.subscribe(layerData => {
            if (layerData.openState) {
                setLayerInfo(layerData);
                setTimeout(() => {
                    if (!layerContainerRef.current) return;
                    layerContainerRef.current.classList.add(styles.open);
                }, 10);
            } else {
                if (layerContainerRef.current) {
                    globalBottomLayerCloseSubject.next(layerData.layerName);
                    layerContainerRef.current.classList.remove(styles.open);
                }
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);
    return (
        <>
            {layerInfo && layerInfo.openState && (
                <div
                    style={{
                        bottom: `${layerInfo.position?.height || 0}px`,
                    }}
                    className={`${styles.layer}`}
                    ref={layerRef}
                    onClick={event => {
                        if (
                            !layerRef.current ||
                            event.target !== layerRef.current ||
                            !layerContainerRef.current?.classList.contains(
                                styles.open
                            )
                        )
                            return;

                        if (layerContainerRef.current) {
                            globalBottomLayerCloseSubject.next(
                                layerInfo && layerInfo.layerName
                            );
                            layerContainerRef.current.classList.remove(
                                styles.open
                            );
                        }
                    }}
                >
                    <div
                        className={`${styles['layer-container']}`}
                        ref={layerContainerRef}
                        onTransitionEnd={() => {
                            if (!layerContainerRef.current) return;
                            if (
                                !layerContainerRef.current.classList.contains(
                                    styles.open
                                )
                            ) {
                                setLayerInfo(null);
                            }
                        }}
                    >
                        {layerInfo.children}
                    </div>
                </div>
            )}
        </>
    );
};
