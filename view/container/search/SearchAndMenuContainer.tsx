import { WebtoonSearchInput } from '@components/input/fragments/WebtoonSearchInput';
import { from, map, zip } from 'rxjs';
import logo from '@root/image/test.png';
import style from './SearchAndMenuContainer.module.css';
import { SearchButton } from '@components/button/fragments/SearchButton';
import { useEffect, useRef, useState } from 'react';
import { windowResize } from '@handler/globalEvents';

const searchAndMenuRef = useRef<HTMLDivElement>(null);

export const useHeightState = () => {
    const [height, setHeight] = useState<number>();

    useEffect(() => {
        if (!searchAndMenuRef.current) return;
        setHeight(searchAndMenuRef.current.getBoundingClientRect().height);
    }, [searchAndMenuRef]);

    useEffect(() => {
        const subscribe = windowResize.subscribe((ev) => {
            if (!searchAndMenuRef.current) return;
            setHeight(searchAndMenuRef.current.getBoundingClientRect().height);
        });
        return () => {
            subscribe.unsubscribe();
        };
    });

    return { height };
};

export const SearchAndMenuContainer = () => {
    return (
        <div
            ref={searchAndMenuRef}
            className={style['search-and-menu-container']}
        >
            <WebtoonSearchInput></WebtoonSearchInput>
            <SearchButton></SearchButton>
        </div>
    );
};

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
