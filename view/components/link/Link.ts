import { from, of, Observable } from 'rxjs';
import styles from './Link.module.css'

// components -> container -> wrapper
export type LinkStyle = {
	size?: 'initial' | 'inherit' | 'long' | 'short' | 'middle'
	type?: 'standard'
};

export const Link = ( ({size = 'initial', type = 'standard'} : LinkStyle = {}) => {
	let promise = new Promise<HTMLAnchorElement>(res=>{
		let link = Object.assign(document.createElement('a'), {
			//className:`${styles[`button-${type}`]} ${styles[size]}`
		});
		res(link);
	})
	return from(promise)
})
