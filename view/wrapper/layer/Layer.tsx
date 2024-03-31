import styles from './layer.module.css';
import { LoginContainer } from '@container/login/LoginContainer';
import { LoadingRotate } from '@components/loading/Loading';
import { Observable, flatMap, from, fromEvent, map, mergeMap, zip } from 'rxjs';
import closeSvg from '@svg/close.svg';
import { CloseButton } from '@components/button/fragments/CloseButton';

export type DimLayerProps = {};
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
