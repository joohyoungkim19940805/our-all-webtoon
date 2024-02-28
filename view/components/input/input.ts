import { from } from "rxjs";
import styles from './input.module.css'

export type InputStyle = {
	type? : 'hidden' | 'radio' | 'checbox' | 'text' | 'search' | 'textarea' | 'date' | 'datetime-local',
	/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete */
	autocomplete? : 'off' | 'on' | 
		/** name 또는 name 내의 광범위한 인간 이름과 이름 구조 다루기 -> */
		'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'family-name' | 'honorific-suffix' | 'nickname' | 'email' | 'username' | 'new-password' | 'current-password' | 'one-time-code' |
		'organization-title' | 'organization' | 
		'street-address' | 'shipping' | 'billing' |
		/** streat-address 가 없는 경우에만 존재 가능 */
		'address-line1' | 'address-line2' | 'address-line3' |
		'address-level4' | 'address-level3' | 'address-level2' | 'address-level1' |
		'country' | 'country-name' | 'postal-code' | 
		/** 신용 카드 관련 */
		'cc-name' | 'cc-given-name' | 'cc-additional-name' | 'cc-family-name' | 'cc-number' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year' | 'cc-csc' | 'cc-type' |
		/** 통화(화폐) 관련 */
		'transaction-currency' | 'transaction-amount' | 
		'language' | 'bday' | 'bday-day' | 'bday-month' | 'bday-year' | 'sex' | 
		/** 국가 코드 && 전화 관련 */
		'tel' | 'tel-country-code' | 'tel-national' | 'tel-area-code' | 'tel-local' | 'tel-extension' | 
		'impp' | 'url' | 'photo' | 'webauthn' | ''

}

export const input = ( ({type = 'text', autocomplete = 'on'} : InputStyle = {}) => {
	let promise = new Promise<HTMLInputElement>(res =>{
		let input = Object.assign(document.createElement('input'), {
			className: `${styles["input-standard"]}`,
			type
		})
		res(input);
	});
	return from(promise)
})