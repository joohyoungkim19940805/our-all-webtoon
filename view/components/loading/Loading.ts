import { from, of } from "rxjs";
import styles from './loading.module.css'

export const loadingRotate = () => {
	let promise = new Promise<HTMLDivElement>(res => {
		let div = Object.assign(document.createElement('div'), {
			className : `${styles["loading-rotate"]}`
		})
		res(div);
	})
	return from(promise)
}