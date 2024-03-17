import { input } from "@components/input/Input";
import { webtoonSearchInput } from "@components/input/fragments/WebtoonSearchInput";
import { from, map, zip } from "rxjs";

export const headContainer = (() => {
	let promise = new Promise<HTMLDivElement>(res=>{
		let div = Object.assign(document.createElement('div'), {
		});
		res(div);
	});
	return zip(
		from(promise),
		webtoonSearchInput
	).pipe(
		map( ([headContainer, ...components]) => {
			headContainer.append(...components);
			return {headContainer, components};
		} )
	)
})();
