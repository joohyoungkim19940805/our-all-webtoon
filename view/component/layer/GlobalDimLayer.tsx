import { LoginContainer } from '@component/account/LoginContainer';
import { SingUpContainer } from '@component/account/SingUpContainer';
import { CloseSvg } from '@component/svg/CloseSvg';
import { useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import buttonStyles from '../Button.module.css';
import styles from './GlobalDimLayer.module.css';

// export type GlobalDimLayerProps = {
//     children: ReactNode | ReactElement | JSX.Element;
// };
export const GlobalDimLayer = () => {
    const layerRef = useRef<HTMLDivElement>(null);
    /*const [children, setChildren] = useState<
        ReactNode | ReactElement | JSX.Element | undefined
    >(false);*/
    const location = useLocation();

    return (
        <>
            {location.pathname.includes('/layer') && (
                <div
                    className={`${styles.layer}`}
                    ref={layerRef}
                    onClick={event => {
                        if (
                            !layerRef.current ||
                            event.nativeEvent.composedPath()[0] !==
                                layerRef.current
                        )
                            return;
                        history.back();
                    }}
                >
                    <div className={`${styles['layer-container']}`}>
                        <button
                            onClick={() => history.back()}
                            type="button"
                            className={`${buttonStyles.button} ${buttonStyles['inherit']} ${buttonStyles.svg} ${buttonStyles[`top`]}`}
                        >
                            <CloseSvg></CloseSvg>
                        </button>
                        <Routes>
                            <Route
                                path={`/layer/login-layer`}
                                element={<LoginContainer></LoginContainer>}
                            ></Route>
                            <Route
                                path={`/layer/sing-up`}
                                element={<SingUpContainer></SingUpContainer>}
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
