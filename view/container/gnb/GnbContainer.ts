import styles from './GnbContainer.module.css'
import { button } from '@components/button/Button'
import boxSvg from '@svg/box.svg';
import playListSearchSvg from '@svg/search-loading.svg';
import addSvg from '@svg/add.svg';
import { Subject, concat, from, fromEvent, map, merge, mergeMap, zip } from 'rxjs'

//최신 업데이트 버튼
export const latestUpdateButtonEvent = new Subject<Event>();
export const latestUpdateButton = button({},{
	size:'short'
}).pipe(map(button=>{
	button.innerHTML = boxSvg;
	button.append(document.createTextNode('최신 업데이트'));
	button.onclick = (event) => {
		latestUpdateButtonEvent.next(event);
	}
	return button
}));

export const webtoonListButtonEvent = new Subject<Event>();
export const webtoonListButton = button({},{
	size:'short'
}).pipe(map(button=>{
	button.innerHTML = playListSearchSvg;
	button.append(document.createTextNode('웹툰 목록'));
	button.onclick = (event) => {
		webtoonListButtonEvent.next(event);
	}
	return button
}));

export const paintingAddButtonEvent = new Subject<Event>();
export const paintingAddButton = button({},{
	size: 'short', animation: 'spin'
}).pipe(map(button=>{
	button.innerHTML = addSvg;
	button.onclick = (event) => {
		webtoonListButtonEvent.next(event);
	}
	return button
}));

export const gnbContainer = (() => {
	let promise = new Promise<HTMLDivElement>(res=>{
		let div = Object.assign(document.createElement('div'), {
			className: `${styles['gnb-container']}`
		});
		res(div);
	});
	return zip(from(promise), latestUpdateButton, webtoonListButton, paintingAddButton)
	.pipe(
		map( ([gnbContainer, ...buttons]) => {
			gnbContainer.append(...buttons);
			let [latestUpdateButton ,webtoonListButton, paintingAddButton] = buttons;
			return {gnbContainer, latestUpdateButton ,webtoonListButton, paintingAddButton} 
		})
	);
})();