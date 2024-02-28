import { from, of, Observable } from 'rxjs';
import styles from './button.module.css'

// components -> container -> wrapper
export type ButtonStyle = {
	size?: 'initial' | 'inherit' | 'long' | 'short' | 'middle'
	type?: 'standard'
};

export const button = ( ({size = 'initial', type = 'standard'} : ButtonStyle = {}) => {
	let promise = new Promise<HTMLButtonElement>(res=>{
		let button = Object.assign(document.createElement('button'), {
			className:`${styles[`button-${type}`]} ${styles[size]}`
		});
		res(button);
	})
	return from(promise)
})