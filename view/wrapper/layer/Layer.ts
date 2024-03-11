import styles from './layer.module.css'
import { loginContainer } from "@container/login/LoginContainer";
import { loadingRotate } from "@components/loading/Loading";
import { Observable, from } from "rxjs";
import closeSvg from '@svg/close.svg';
import common from '@handler/common';
import { accessNavigation, windowHashChange } from '@handler/globalEvents';

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
		this.classList.add(styles.layer);
		this.onclick = (event : MouseEvent) => event.composedPath()[0] === this && this.closeLayer()
		windowHashChange.subscribe(event => {
			let oldUrl = event.oldURL.split('#'), oldHash = oldUrl[oldUrl.length - 1];
			let newUrl = event.newURL.split('#'), newHash = newUrl[newUrl.length - 1]
			if(oldHash === 'login-layer'){
				this.remove();
			}else if(newHash === 'login-layer' && ! this.isConnected){
				document.body.append(this);
			}
		})
	}

	connectedCallback(){
		location.hash='login-layer';
	}

	closeLayer(){
		this.isConnected && accessNavigation.subscribe(entry=>{
			if(entry.name.includes('#login-layer')) {
				this.remove();
				location.hash = '';
			}else{
				history.back();
			}
		})
	}
}


export const fullLayer = ( () => {
	const promise = new Promise<{layer:LayerHandler, layerContainer:HTMLDivElement}>(res => {
		let layer = new LayerHandler(); 
		let layerContainer = Object.assign(document.createElement('div'), {
			className: styles['layer-container']
		})
		let closeButton = Object.assign(document.createElement('button'), {
			type: 'button',
			className: styles['layer-close-button'],
			innerHTML: closeSvg,
			onclick: ()=> layer.closeLayer()
		})
		layerContainer.append(closeButton);
		layer.append(layerContainer);
		res({layer, layerContainer});
	});
	return from(promise);
} )();