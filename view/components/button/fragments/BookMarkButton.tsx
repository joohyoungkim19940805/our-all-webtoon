import { Button } from '@components/button/Button';
import bookmarkSvg from '@svg/bookmark.svg';
import { Subject, map } from 'rxjs';
// 북마크 목록 버튼
export const bookMarkButtonEvent = new Subject<Event>();
export const BookMarkButtonButton = () => {
    return (
        <Button
            textContent="북마크"
            event={{ onclick: (event) => bookMarkButtonEvent.next(event) }}
            type="button"
            size="short"
            svg={bookmarkSvg}
        ></Button>
    );
};

/*button(
    {
        textContent: '북마크',
        event: { onclick: (event) => bookMarkButtonEvent.next(event) },
    },
    { size: 'short', svg: bookmarkSvg },
);
*/
