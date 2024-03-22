import { from, map, zip } from "rxjs";
import styles from './HeadContainer.module.css'
import { searchAndMenuContainer } from "@container/search/SearchAndMenuContainer";
import { select } from "@components/select/Select";
import { option } from "@components/option/Option";

export const recommendContainer = (() => {
	let promise = new Promise<HTMLDivElement>(res => {
		let container = Object.assign(document.createElement('div'), {

		})
		res(container);
	})
	return from(promise) //zip(
		
	//);
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
