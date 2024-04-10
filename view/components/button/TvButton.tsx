import { Button } from '@components/button/Button';
import { TvSvg } from '@components/svg/TvSvg';
import { Subject, map } from 'rxjs';
import styles from './Button.module.css';

// 생방송 버튼
export const tvButtonEvent = new Subject<Event>();
export const TvButton = () => {
    return (
        <button
            type="button"
            className={`${styles.button} ${styles['short']} ${styles.svg} ${styles[`svg_top`]}`}
        >
            준비 중<TvSvg></TvSvg>
        </button>
    );
};
