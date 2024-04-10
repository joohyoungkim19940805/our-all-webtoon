import { BookmarkSvg } from '@components/svg/BookmarkSvg';
import { Subject, map } from 'rxjs';
import styles from './Button.module.css';

// 북마크 목록 버튼
export const bookMarkButtonEvent = new Subject<any>();
export const BookMarkButtonButton = () => {
    return (
        <button
            type="button"
            className={`${styles.button} ${styles['short']} ${styles.svg} ${styles[`svg_top`]}`}
        >
            북마크
            <BookmarkSvg></BookmarkSvg>
        </button>
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
