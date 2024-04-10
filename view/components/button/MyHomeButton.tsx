import { Subject, map } from 'rxjs';
import { UserlaneSvg } from '@components/svg/UserlaneSvg';

import styles from './Button.module.css';

// 마이페이지 버튼
export const myHomeButtonEvent = new Subject<Event>();
export const MyHomeButton = () => {
    return (
        <button
            type="button"
            className={`${styles.button} ${styles['short']} ${styles.svg} ${styles[`svg_top`]}`}
        >
            MY
            <UserlaneSvg></UserlaneSvg>
        </button>
    );
};
