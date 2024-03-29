import { Button } from '@components/button/Button';
import BoardSvg from '@svg/board.svg';
import { Subject, map } from 'rxjs';

// 게시판 버튼
export const noticeBoardButtonEvent = new Subject<Event>();
export const NoticeBoardButton = () => {
    return (
        <Button
            textContent="게시판"
            event={{ onclick: (event) => noticeBoardButtonEvent.next(event) }}
            size="short"
            svg={BoardSvg}
        ></Button>
    );
};
