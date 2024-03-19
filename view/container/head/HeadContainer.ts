import { input } from "@components/input/Input";
import { webtoonSearchInput } from "@components/input/fragments/WebtoonSearchInput";
import { from, map, zip } from "rxjs";
import styles from './HeadContainer.module.css'

export const rankContainer = (() => {
	let promise = new Promise<HTMLDivElement>(res => {
		let div = Object.assign(document.createElement('div'), {
			textContent: 'rank!'
		})
		res(div);
	})
	return from(promise);
})();

export const searchAndMenuContainer = (() => {
	let promise = new Promise<HTMLDivElement>(res=>{
		let div = Object.assign(document.createElement('div'), {
			
		});
		res(div);
	});
	return zip(
		from(promise),
		webtoonSearchInput
	).pipe(
		map( ([searchAndMenuContainer, ...components]) => {
			searchAndMenuContainer.append(...components);
			return {searchAndMenuContainer, components};
		} )
	)
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
		rankContainer,
		searchAndMenuContainer,
	).pipe(
		map(([headContainer, rankContainer, {searchAndMenuContainer, components: searchAndMenuComponents}]) => {
			headContainer.replaceChildren(rankContainer, searchAndMenuContainer);
			return {headContainer, rankContainer, searchAndMenuContainer};
		})
	)
})();
