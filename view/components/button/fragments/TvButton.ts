import { button } from '@components/button/Button';
import tvSvg from '@svg/tv.svg'
import { Subject, map } from 'rxjs';

// 생방송 버튼
export const tvButtonEvent = new Subject<Event>();
export const tvButton = button(
	{textContent: '준비 중'},
	{size:'short', svg: tvSvg}
).pipe(map(tv=>{
	tv.onclick = (event) => {
		tvButtonEvent.next(event);
	}
	return tv;
}));
