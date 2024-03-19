import styles from './layer.module.css'
import { loginContainer } from "@container/login/LoginContainer";
import { loadingRotate } from "@components/loading/Loading";
import { Observable, flatMap, from, fromEvent, map, mergeMap, zip } from "rxjs";
import closeSvg from '@svg/close.svg';
import { closeButton } from '@components/button/fragments/CloseButton';
/*
export class LayerHandler extends HTMLElement{
	static{
		window.customElements.define('layer-handler', this);
	}

    constructor(attribute : any = {}) {
		super();
		if(attribute.hasOwnProperty('className')){
            this.classList.add(attribute.className);
            delete attribute.className;
        }
        Object.assign(this, attribute)
	}

	connectedCallback(){
		
	}
}
*/

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