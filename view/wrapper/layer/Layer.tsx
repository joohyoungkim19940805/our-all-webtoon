import styles from './layer.module.css';
import buttonStyles from '@components/button/Button.module.css';
import { CloseSvg } from '@components/svg/CloseSvg';
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

export const GlobalDimLayer = () => {
    const layerRef = useRef<HTMLDivElement>(null);
    const [children, setChildren] = useState<
        ReactNode | ReactElement | JSX.Element | undefined
    >(false);
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <>
            {children && (
                <div
                    className={`${styles.layer}`}
                    ref={layerRef}
                    onClick={(event) => {
                        if (
                            !layerRef.current ||
                            event.nativeEvent.composedPath()[0] !==
                                layerRef.current
                        )
                            return;
                    }}
                >
                    <div className={`${styles['layer-container']}`}>
                        <button
                            onClick={() => history.back()}
                            type="button"
                            className={`${buttonStyles.button} ${buttonStyles['inherit']} ${buttonStyles.svg} ${buttonStyles[`svg_top`]}`}
                        >
                            <CloseSvg></CloseSvg>
                        </button>
                        <Routes>
                            <Route
                                path={`${currentPath}/layer/*`}
                                element={children}
                            ></Route>
                        </Routes>
                    </div>
                </div>
            )}
        </>
    );
};
/*
export const dimLayer = ( () => {
	const promise = new Promise<{layer:HTMLDivElement, layerContainer:HTMLDivElement}>(res => {
		let layer = Object.assign(document.createElement('div'), {
			className: styles.layer,
			onclick: (event : MouseEvent) => event.composedPath()[0] === layer && layer.remove()
		})
		let layerContainer = Object.assign(document.createElement('div'), {
			className: styles['layer-container']
		})
		layer.append(layerContainer);

		closeButton(layer).pipe(map(button=>{
			layerContainer.append(button)
			button.classList.add(styles['layer-close-button'])
			return {layer, layerContainer}
		})).subscribe();
		
		res({layer, layerContainer});
	});
	return from(promise)
	
} )();
*/
