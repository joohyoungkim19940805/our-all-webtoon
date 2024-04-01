import { Button } from '@components/button/Button';
import { BoardSvg } from '@components/svg/BoardSvg';
import { Subject, map } from 'rxjs';

// 게시판 버튼
export const noticeBoardButtonEvent = new Subject<Event>();
export const NoticeBoardButton = () => {
    return (
        <Button textContent="게시판" size="short" svg={<BoardSvg />}></Button>
    );
};
