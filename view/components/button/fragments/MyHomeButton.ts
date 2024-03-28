import { Subject, map } from 'rxjs';
import userlaneSvg from '@svg/userlane.svg';
import { button } from '@components/button/Button';
// 마이페이지 버튼
export const myHomeButtonEvent = new Subject<Event>();
export const myHomeButton = button(
    {
        textContent: 'MY',
        event: { onclick: (event) => myHomeButtonEvent.next(event) },
    },
    { size: 'short', svg: userlaneSvg },
);
