import { button } from "@components/button/Button";
import { Subject, map } from "rxjs";
import playListSearchSvg from '@svg/search-loading.svg';

// 웹툰 목록 버튼
export const webtoonListButtonEvent = new Subject<Event>();
export const webtoonListButton = button(
	{ 
		textContent: '웹툰 목록',
		event: {
			onclick: (e) => webtoonListButtonEvent.next(e)
		}
	},
	{ size:'short', svg: playListSearchSvg }
)
