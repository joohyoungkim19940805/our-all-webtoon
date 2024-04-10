import { Subject, map } from 'rxjs';
import { BoxSvg } from '@components/svg/BoxSvg';
import styles from './Button.module.css';

// 최신 업데이트 버튼
export const latestUpdateButtonEvent = new Subject<Event>();
latestUpdateButtonEvent.subscribe((e) => console.log(e));

export const LatestUpdateButton = () => {
    return (
        <button
            type="button"
            className={`${styles.button} ${styles['short']} ${styles.svg} ${styles[`svg_top`]}`}
        >
            최신 업데이트
            <BoxSvg></BoxSvg>
        </button>
    );
};
