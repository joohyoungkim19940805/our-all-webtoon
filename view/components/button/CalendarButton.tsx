import { Subject, map } from 'rxjs';

import { CalendarSvg } from '@components/svg/CalendarSvg';
import styles from './Button.module.css';
//연재 일정 버튼
export const calendarButtonEvent = new Subject<Event>();
export const CalendarButton = () => {
    return (
        <button
            type="button"
            className={`${styles.button} ${styles['short']} ${styles.svg} ${styles[`svg_top`]}`}
        >
            연재 일정
            <CalendarSvg></CalendarSvg>
        </button>
    );
};
