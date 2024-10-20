import { WebtoonSearchInput } from '@component/search/WebtoonSearchInput';
import { SearchSvg } from '@svg/SearchSvg';
import { forwardRef } from 'react';
import buttonStyle from '../Button.module.css';
import style from './SearchAndMenuContainer.module.css';

export const SearchAndMenuContainer = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref} className={style['search-and-menu-container']}>
            <WebtoonSearchInput></WebtoonSearchInput>
            <button
                className={`${buttonStyle.button} ${buttonStyle['inherit']} ${buttonStyle.svg} ${buttonStyle[`top`]}`}
            >
                <SearchSvg></SearchSvg>
            </button>
        </div>
    );
});

/*
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

*/
