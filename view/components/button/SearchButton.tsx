import { Subject, map } from 'rxjs';
import { SearchSvg } from '@components/svg/SearchSvg';
import styles from './Button.module.css';

// 웹툰 검색 버튼
export const searchButtonEvent = new Subject<Event>();
export const SearchButton = () => {
    return (
        <button
            className={`${styles.button} ${styles['inherit']} ${styles.svg} ${styles[`svg_top`]}`}
        >
            <SearchSvg></SearchSvg>
        </button>
    );
    //return <Button svg={<SearchSvg />}></Button>;
};
