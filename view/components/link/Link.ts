import { from, of, Observable } from 'rxjs';
import styles from './Link.module.css'

export type LinkAttribute = {
	hrefType?: 'mailto:' | 'tel:+' | 'http' | 'https' | 'blob' | 'data' | '#' | '/',
	href?: 'javascript:void(0);' | string
	download?: string,
	ping?: string,
	referrerpolicy?: string,
	rel?: string,
	/**
	 * 참고: target을 사용할 때, 
	 * rel="noreferrer"를 추가해 
	 * window.opener API의 악의적인 사용을 방지하는걸 고려하세요
	 */
	target?: '_self' | '_top' | '_blank' | '_parent'
} 

// components -> container -> wrapper
export type LinkStyle = {
	size?: 'initial' | 'inherit' | 'long' | 'short' | 'middle'
	type?: 'standard'
};

export const link = ( (
	{} : LinkAttribute = {},
	{} : LinkStyle = {}
) => {
	let promise = new Promise<HTMLAnchorElement>(res=>{
		let link = Object.assign(document.createElement('a'), {
			className : `${styles.link}`
		});
		res(link);
	})
	return from(promise)
})
