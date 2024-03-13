import styles from './GnbContainer.module.css'
import { button } from '@components/button/Button'
import buttonStyle from '@components/button/Button.module.css'
import spinStyle from '@components/spin.module.css'
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

// 최신 업데이트 버튼
export const latestUpdateButtonEvent = new Subject<Event>();
latestUpdateButtonEvent.subscribe(e=>console.log(e))
export const latestUpdateButton = button(
	{ 
		textContent: '최신 업데이트',
		event: {
			onclick: (e)=>latestUpdateButtonEvent.next(e)
		}
	},
	{ size:'short', svg: boxSvg},
).pipe(map(latestUpdate=>{
	latestUpdate.dataset.variable_name = Object.keys({latestUpdateButton})[0]
	return latestUpdate
}));

// 웹툰 목록 버튼
export const webtoonListButtonEvent = new Subject<Event>();
export const webtoonListButton = button(
	{ 
		textContent: '웹툰 목록',
		event: {
			onclick: (e)=>webtoonListButtonEvent.next(e)
		}
	},
	{ size:'short', svg: playListSearchSvg }
).pipe(map(webtoonList=>{
	webtoonList.dataset.variable_name = Object.keys({webtoonListButton})[0]

	return webtoonList
}));

// 웹툰 연재하기 버튼
export const paintingAddButtonEvent = new Subject<Event>();
export const paintingAddButton = button(
	{ 
		event: {
			onclick: (e) => {
				paintingAddButtonEvent.next(e)
			}
		}
	},
	{ size: 'short', animation: 'spin', svg: addSvg }
).pipe(map(paintingAdd=>{
	const svg = paintingAdd.querySelector('svg')
	if( ! svg) return paintingAdd;
	svg.classList.add(spinStyle.spin_target);
	paintingAddButtonEvent.subscribe((ev)=>{
		svg.classList.add(spinStyle.spin);
		setTimeout(()=>{
			svg.classList.remove(spinStyle.spin);
			//svg.ontransitionend = ()=> svg?.classList.remove(spinStyle.spin_target)
		},1000)
	})
	return paintingAdd
}));

// 게시판 버튼
export const noticeBoardButtonEvent = new Subject<Event>();
export const noticeBoardButton = button({},{
	size:'short', svg: boardSvg
}).pipe(map(noticeBoard=>{
	noticeBoard.dataset.variable_name = Object.keys({noticeBoardButton})[0]
	noticeBoard.append(document.createTextNode('게시판'));
	noticeBoard.onclick = (event) => {
		noticeBoardButtonEvent.next(event);
	}
	return noticeBoard
}));

// 마이페이지 버튼
export const myHomeButtonEvent = new Subject<Event>();
export const myHomeButton = button({},{
	size:'short', svg: userlaneSvg
}).pipe(map(myHome=>{
	myHome.dataset.variable_name = Object.keys({myHomeButton})[0]
	myHome.append(document.createTextNode('MY'));
	myHome.onclick = (event) => {
		myHomeButtonEvent.next(event);
	}
	return myHome
}));

// 북마크 목록 버튼
export const bookMarkButtonEvent = new Subject<Event>();
export const bookMarkButtonButton = button({},{
	size:'short', svg: bookmarkSvg
}).pipe(map(bookMark=>{
	bookMark.dataset.variable_name = Object.keys({myHomeButton})[0]
	bookMark.append(document.createTextNode('북마크'));
	bookMark.onclick = (event) => {
		bookMarkButtonEvent.next(event);
	}
	return bookMark;
}));

// 생방송 버튼
export const tvButtonEvent = new Subject<Event>();
export const tvButton = button({},{
	size:'short', svg: tvSvg
}).pipe(map(tv=>{
	tv.dataset.variable_name = Object.keys({myHomeButton})[0]
	tv.append(document.createTextNode('준비 중'));
	tv.onclick = (event) => {
		tvButtonEvent.next(event);
	}
	return tv;
}));

//상점 버튼
export const cartButtonEvent = new Subject<Event>();
export const cartButton = button({},{
	size:'short', svg: cartSvg
}).pipe(map(cart=>{
	cart.dataset.variable_name = Object.keys({myHomeButton})[0]
	//감자 or 당근 화폐
	cart.append(document.createTextNode('준비 중'));
	cart.onclick = (event) => {
		cartButtonEvent.next(event);
	}
	return cart;
}));

//연재 일정 버튼
export const calendarButtonEvent = new Subject<Event>();
export const calendarButton = button({},{
	size:'short', svg: calendarSvg
}).pipe(map(calendar=>{
	calendar.dataset.variable_name = Object.keys({myHomeButton})[0]
	calendar.append(document.createTextNode('연재 일정'));
	calendar.onclick = (event) => {
		calendarButtonEvent.next(event);
	}
	return calendar;
}));
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
