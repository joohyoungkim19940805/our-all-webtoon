import { webtoonSearchInput } from "@components/input/fragments/WebtoonSearchInput";
import { from, map, zip } from "rxjs";

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
			searchAndMenuContainer.replaceChildren(...components);
			return {searchAndMenuContainer, components};
		} )
	)
})();