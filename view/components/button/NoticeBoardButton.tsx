import { BoardSvg } from '@components/svg/BoardSvg';
import { Subject, map } from 'rxjs';
import styles from './Button.module.css';
// 게시판 버튼
export const noticeBoardButtonEvent = new Subject<Event>();
export const NoticeBoardButton = () => {
    return (
        <button
            type="button"
            className={`${styles.button} ${styles['short']} ${styles.svg} ${styles[`svg_top`]}`}
        >
            게시판
            <BoardSvg></BoardSvg>
        </button>
    );
};
