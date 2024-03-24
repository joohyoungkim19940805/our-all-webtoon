import { webtoonSearchInput } from "@components/input/fragments/WebtoonSearchInput";
import { from, map, zip } from "rxjs";
import logo from "@root/image/test.png";
import style from "./SearchAndMenuContainer.module.css"
import { searchButton } from "@components/button/fragments/SearchButton";
export const searchAndMenuContainer = (() => {
	console.log(logo);
	let promise = new Promise<HTMLDivElement>(res=>{
		let div = Object.assign(document.createElement('div'), {
			className: `${style["search-and-menu-container"]}`,
			innerHTML: `
				
			`
		});
		res(div);
	});
	return zip(
		from(promise),
		webtoonSearchInput,
		searchButton
	).pipe(
		map( ([searchAndMenuContainer, ...components]) => {
			searchAndMenuContainer.append(...components);
			//searchAndMenuContainer.children[0].after(...components);
			return {searchAndMenuContainer, components};
		} )
	)
})();