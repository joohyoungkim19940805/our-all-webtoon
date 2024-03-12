import styles from './layer.module.css'
import { loginContainer } from "@container/login/LoginContainer";
import { loadingRotate } from "@components/loading/Loading";
import { Observable, from } from "rxjs";
import closeSvg from '@svg/close.svg';
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

export const fullLayer = ( () => {
	const promise = new Promise<{layer:HTMLDivElement, layerContainer:HTMLDivElement}>(res => {
		let layer = Object.assign(document.createElement('div'), {
			className: styles.layer,
			onclick: (event : MouseEvent) => event.composedPath()[0] === layer && layer.remove()
		})
		let layerContainer = Object.assign(document.createElement('div'), {
			className: styles['layer-container']
		})
		let closeButton = Object.assign(document.createElement('button'), {
			type: 'button',
			className: styles['layer-close-button'],
			innerHTML: closeSvg,
			onclick: ()=> layer.isConnected && layer.remove()
		})
		layerContainer.append(closeButton);
		layer.append(layerContainer);
		res({layer, layerContainer});
	});
	return from(promise);
} )();