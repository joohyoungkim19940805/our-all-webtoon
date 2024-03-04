import styles from './GnbContainer.module.css'
import { button } from '@components/button/Button'
import buttonStyle from '@components/button/Button.module.css'
import boxSvg from '@svg/box.svg';
import playListSearchSvg from '@svg/search-loading.svg';
import addSvg from '@svg/add.svg';
import boardSvg from '@svg/board.svg';
import userlaneSvg from '@svg/userlane.svg'
import tvSvg from '@svg/tv.svg'
import bookmarkSvg from '@svg/bookmark.svg'
import cartSvg from '@svg/shopping-cart.svg'
import calendarSvg from '@svg/calendar.svg'
import { Subject, concat, from, fromEvent, map, merge, mergeMap, zip } from 'rxjs'

//최신 업데이트 버튼
export const latestUpdateButtonEvent = new Subject<Event>();
export const latestUpdateButton = button({},{
	size:'short'
}).pipe(map(latestUpdate=>{
	latestUpdate.innerHTML = boxSvg;
	latestUpdate.dataset.variable_name = Object.keys({latestUpdateButton})[0]
	latestUpdate.append(document.createTextNode('최신 업데이트'));
	latestUpdate.onclick = (event) => {
		latestUpdateButtonEvent.next(event);
	}
	return latestUpdate
}));

export const webtoonListButtonEvent = new Subject<Event>();
export const webtoonListButton = button({},{
	size:'short'
}).pipe(map(webtoonList=>{
	webtoonList.innerHTML = playListSearchSvg;
	webtoonList.dataset.variable_name = Object.keys({webtoonListButton})[0]
	webtoonList.append(document.createTextNode('웹툰 목록'));
	webtoonList.onclick = (event) => {
		webtoonListButtonEvent.next(event);
	}
	return webtoonList
}));

export const paintingAddButtonEvent = new Subject<Event>();
export const paintingAddButton = button({},{
	size: 'short', animation: 'spin'
}).pipe(map(paintingAdd=>{
	paintingAdd.innerHTML = addSvg;
	paintingAdd.onclick = (event) => {
		paintingAdd.classList.add(buttonStyle.spin);
		paintingAdd.dataset.variable_name = Object.keys({paintingAddButton})[0]
		setTimeout(()=>{paintingAdd.classList.remove(buttonStyle.spin)},1500)
		paintingAddButtonEvent.next(event);
	}
	return paintingAdd
}));

export const noticeBoardButtonEvent = new Subject<Event>();
export const noticeBoardButton = button({},{
	size:'short'
}).pipe(map(noticeBoard=>{
	noticeBoard.innerHTML = boardSvg;
	noticeBoard.dataset.variable_name = Object.keys({noticeBoardButton})[0]
	noticeBoard.append(document.createTextNode('게시판'));
	noticeBoard.onclick = (event) => {
		noticeBoardButtonEvent.next(event);
	}
	return noticeBoard
}));

export const myHomeButtonEvent = new Subject<Event>();
export const myHomeButton = button({},{
	size:'short'
}).pipe(map(myHome=>{
	myHome.innerHTML = userlaneSvg;
	myHome.dataset.variable_name = Object.keys({myHomeButton})[0]
	myHome.append(document.createTextNode('MY'));
	myHome.onclick = (event) => {
		myHomeButtonEvent.next(event);
	}
	return myHome
}));

export const bookMarkButtonEvent = new Subject<Event>();
export const bookMarkButtonButton = button({},{
	size:'short'
}).pipe(map(bookMark=>{
	bookMark.innerHTML = bookmarkSvg;
	bookMark.dataset.variable_name = Object.keys({myHomeButton})[0]
	bookMark.append(document.createTextNode('북마크'));
	bookMark.onclick = (event) => {
		myHomeButtonEvent.next(event);
	}
	return bookMark;
}));

export const tvButtonEvent = new Subject<Event>();
export const tvButton = button({},{
	size:'short'
}).pipe(map(tv=>{
	tv.innerHTML = tvSvg;
	tv.dataset.variable_name = Object.keys({myHomeButton})[0]
	tv.append(document.createTextNode('준비 중'));
	tv.onclick = (event) => {
		myHomeButtonEvent.next(event);
	}
	return tv;
}));

export const cartButtonEvent = new Subject<Event>();
export const cartButton = button({},{
	size:'short'
}).pipe(map(cart=>{
	cart.innerHTML = cartSvg;
	cart.dataset.variable_name = Object.keys({myHomeButton})[0]
	cart.append(document.createTextNode('감자 충전(준비 중)'));
	cart.onclick = (event) => {
		myHomeButtonEvent.next(event);
	}
	return cart;
}));

export const calendarButtonEvent = new Subject<Event>();
export const calendarButton = button({},{
	size:'short'
}).pipe(map(calendar=>{
	calendar.innerHTML = calendarSvg;
	calendar.dataset.variable_name = Object.keys({myHomeButton})[0]
	calendar.append(document.createTextNode('업로드 일정'));
	calendar.onclick = (event) => {
		myHomeButtonEvent.next(event);
	}
	return calendar;
}));

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
			gnbContainer.append(...buttons);
			return {gnbContainer, buttons} 
		})
	);
})();