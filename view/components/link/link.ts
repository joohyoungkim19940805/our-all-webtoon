import { from, of, Observable } from 'rxjs';
import styles from './link.module.css'

// components -> container -> wrapper
export type ButtonStyle = {
	size?: 'initial' | 'inherit' | 'long' | 'short' | 'middle'
	type?: 'standard'
};

export const button = ( ({size = 'initial', type = 'standard'} : ButtonStyle = {}) => {
	let promise = new Promise<HTMLAnchorElement>(res=>{
		let link = Object.assign(document.createElement('a'), {
			//className:`${styles[`button-${type}`]} ${styles[size]}`
		});
		res(link);
	})
	return from(promise)
})
