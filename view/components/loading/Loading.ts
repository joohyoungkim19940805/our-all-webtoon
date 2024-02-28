import { of } from "rxjs";
import styles from './loading.module.css'

export const loadingRotate = ((elementTag: HTMLElement)=>{
	let loading = Object.assign(elementTag, {
		className: `${styles["loading-rotate"]}`
	})
	return of(loading);
})