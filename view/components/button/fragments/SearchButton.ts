import { button } from "@components/button/Button";
import { Subject, map } from "rxjs";
import searchSvg from '@svg/search.svg';

// 웹툰 목록 버튼
export const searchButtonEvent = new Subject<Event>();
export const searchButton = button(
	{ 
		event: {
			onclick: (e) => searchButtonEvent.next(e)
		}
	},
	{ svg: searchSvg }
)
