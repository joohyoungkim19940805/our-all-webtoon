import styles from './GnbContainer.module.css'
import { button } from '@components/button/Button'

import { Subject, concat, from, fromEvent, map, merge, mergeMap, zip } from 'rxjs'

import { myHomeButton } from '@components/button/fragments/MyHomeButton'
import { latestUpdateButton, latestUpdateButtonEvent } from '@components/button/fragments/LatestUpdateButton'
import { webtoonListButton, webtoonListButtonEvent } from '@components/button/fragments/WebtoonListButton'
import { paintingAddButton, paintingAddButtonEvent } from '@components/button/fragments/PaintingAddButton'
import { noticeBoardButton, noticeBoardButtonEvent } from '@components/button/fragments/NoticeBoardButton'
import { bookMarkButtonButton } from '@components/button/fragments/BookMarkButton'
import { calendarButton } from '@components/button/fragments/CalendarButton'
import { cartButton } from '@components/button/fragments/CartButton'
import { tvButton } from '@components/button/fragments/TvButton'

//gnbContainer를 div로 바꿔보기 2024 03 07
export const gnbContainer = (() => {
	let promise = new Promise<HTMLDivElement>(res=>{
		let div = Object.assign(document.createElement('div'), {
			className: `${styles['gnb-container']}`
		});
		res(div);
	});
	return zip(
		from(promise), 
		latestUpdateButton, 
		webtoonListButton, 
		paintingAddButton, 
		noticeBoardButton, 
		myHomeButton, 
		bookMarkButtonButton,
		calendarButton,
		cartButton,
		tvButton
	)
	.pipe(
		map( ([gnbContainer, ...buttons]) => {
			buttons.forEach(e=>e.classList.add(styles['gnb-button']))
			gnbContainer.append(...buttons);
			return {gnbContainer, buttons} 
		})
	);
})();    
