import { from, map, zip } from "rxjs";
import { link } from "@components/link/Link";
import styles from './FindAccountInfoContainer.module.css'
export const findIdLink = link()
.pipe(map(findIdLink => {
	findIdLink.textContent = '아이디 찾기'
	return findIdLink;
}));

export const findPasswordLink = link()
.pipe(map(findPasswordLink => {
	findPasswordLink.textContent = '비밀번호 찾기';
	return findPasswordLink;
}));

export const findAccountInfo = (() => {
	let promise = new Promise<HTMLDivElement>(res => {
		let findAccountInfoContainer = Object.assign(document.createElement('div'), {
			className: styles['find-account-info-container']
		})
		res(findAccountInfoContainer);
	})
	return zip(from(promise), findIdLink, findPasswordLink).pipe(
		map(zipList => {
			let [container, ...components] = zipList;
			container.replaceChildren(...components);
			return {
				container, components
			}
		})
	)
})();
from(new Promise(res=> {
}));