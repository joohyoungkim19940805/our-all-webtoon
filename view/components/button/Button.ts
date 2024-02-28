import { from, of, Observable } from 'rxjs';
import styles from './Button.module.css'

// components -> container -> wrapper

export type ButtonAttribute = {
	type?: 'button' | 'submit'
}

export type ButtonStyle = {
	size?: 'initial' | 'inherit' | 'long' | 'short' | 'middle'
	styleType?: 'standard'
};

export const button = ( (
	{size = 'initial', styleType = 'standard'} : ButtonStyle = {}
) => {
	let promise = new Promise<HTMLButtonElement>(res=>{
		let button = Object.assign(document.createElement('button'), {
			className:`${styles.button} ${styles[styleType]} ${styles[size]}`
		});
		res(button);
	})
	return from(promise)
})
