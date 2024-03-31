import { Button } from '@components/button/Button';
import { BookmarkSvg } from '@svg/BookmarkSvg';
import { Subject, map } from 'rxjs';
// 북마크 목록 버튼
export const bookMarkButtonEvent = new Subject<any>();
export const BookMarkButtonButton = () => {
    return (
        <Button
            textContent="북마크"
            type="button"
            size="short"
            svg={<BookmarkSvg />}
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
