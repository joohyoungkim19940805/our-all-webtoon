import { button } from '@components/button/Button';
import boardSvg from '@svg/board.svg';
import { Subject, map } from 'rxjs';

// 게시판 버튼
export const noticeBoardButtonEvent = new Subject<Event>();
export const noticeBoardButton = button(
    {
        textContent: '게시판',
        event: { onclick: (event) => noticeBoardButtonEvent.next(event) },
    },
    { size: 'short', svg: boardSvg },
);
