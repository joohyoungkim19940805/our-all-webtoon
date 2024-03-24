import { input } from "@components/input/Input";
import { map } from "rxjs";

export const webtoonSearchInput = input(
	{ type: 'search', autocomplete: 'on', placeholder: '웹툰을 검색해보세요.' },
	{ size: 'long'}
).pipe(map(search => {
	return search;
}))