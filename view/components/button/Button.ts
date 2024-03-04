import { from, of, Observable } from 'rxjs';
import styles from './Button.module.css'
import boxSvg from '@svg/box.svg';

// components -> container -> wrapper

export type ButtonAttribute = {
	type?: 'button' | 'submit'
}

export type ButtonStyle = {
	size?: 'initial' | 'inherit' | 'long' | 'short' | 'middle'
	styleType?: 'standard',
	animation?: 'spin'
};

export const button = ( (
	{type = 'button'} : ButtonAttribute,
	{size = 'initial', styleType = 'standard', animation} : ButtonStyle = {}
) => {
	let promise = new Promise<HTMLButtonElement>(res=>{
		let button = Object.assign(document.createElement('button'), {
			className:`${styles.button} ${styles[styleType]} ${styles[size]}`,
			type
		});
		/*if(animation) {
			button.classList.add(styles[animation]);
		}*/
		res(button);
		
	})
	return from(promise)
})
