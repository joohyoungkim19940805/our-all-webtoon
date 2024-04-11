import { Subject, map } from 'rxjs';
import { SearchLoadingSvg } from '@components/svg/SearchLoadingSvg';
import styles from './Button.module.css';

// 웹툰 목록 버튼
export const webtoonListButtonEvent = new Subject<Event>();
export const WebtoonListButton = () => {
    return (
        <button
            type="button"
            className={`${styles.button} ${styles['short']} ${styles.svg} ${styles[`svg_top`]}`}
        >
            웹툰 목록
            <SearchLoadingSvg></SearchLoadingSvg>
        </button>
    );
};
