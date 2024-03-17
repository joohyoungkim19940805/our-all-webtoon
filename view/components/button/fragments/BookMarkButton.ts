import { button } from '@components/button/Button';
import bookmarkSvg from '@svg/bookmark.svg'
import { Subject, map } from 'rxjs';

// 북마크 목록 버튼
export const bookMarkButtonEvent = new Subject<Event>();
export const bookMarkButtonButton = button(
	{textContent: '북마크'},
	{size:'short', svg: bookmarkSvg}
).pipe(map(bookMark=>{
	bookMark.onclick = (event) => {
		bookMarkButtonEvent.next(event);
	}
	return bookMark;
}));
