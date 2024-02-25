import { from, of, Observable } from 'rxjs';
import styles from './button.module.css'

// components -> container -> wrapper
export type ButtonStyle = {
	width : 'initial' | 'inherit' | 'long' | 'short' | 'middle'
};

export const button = ((styleType: ButtonStyle = {width:'initial'} ) => {
	let promise = new Promise<HTMLButtonElement>(res=>{
		let button = Object.assign(document.createElement('button'), {
			className:`${styles['button-standard']} ${styles[styleType.width]}`
		});
		res(button);
	})
	return from(promise)
})
