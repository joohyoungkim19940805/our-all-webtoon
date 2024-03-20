import { from, map, zip } from "rxjs";
import styles from './HeadContainer.module.css'
import { searchAndMenuContainer } from "@container/search/SearchAndMenuContainer";

export const recommendContainer = (() => {
	let promise = new Promise<HTMLDivElement>(res => {
		let div = Object.assign(document.createElement('div'), {
			textContent: 'recommend!'
		})
		res(div);
	})
	return from(promise);
})();



export const headContainer = (()=>{
	let promise = new Promise<HTMLDivElement>(res => {
		let div = Object.assign(document.createElement('div'), {
			className: styles['head-container']
		})
		res(div);
	})
	return zip(
		from(promise), 
		recommendContainer,
		searchAndMenuContainer,
	).pipe(
		map(([headContainer, recommendContainer, {searchAndMenuContainer, components: searchAndMenuComponents}]) => {
			headContainer.replaceChildren(recommendContainer, searchAndMenuContainer);
			return {headContainer, recommendContainer, searchAndMenuContainer};
		})
	)
})();
