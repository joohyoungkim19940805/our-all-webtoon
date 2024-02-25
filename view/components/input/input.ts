import { from } from "rxjs";
import styles from './input.module.css'

export type InputStyle = {
	type : 'hidden' | 'radio' | 'checbox' | 'text' | 'search' | 'textarea' | 'date' | 'datetime-local'
}

export const input = ((styleType : InputStyle) => {
	let promise = new Promise<HTMLInputElement>(res =>{
		let input = Object.assign(document.createElement('input'), {
			className: `${styles["input-standard"]}`,
			type:styleType.type
		})
		res(input);
	});
	return from(promise)
})