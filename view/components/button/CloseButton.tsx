import { CloseSvg } from '@components/svg/CloseSvg';
import { Subject, map } from 'rxjs';
import styles from './Button.module.css';

// 닫기 버튼
export const CloseButton = () => {
    return (
        <button
            type="button"
            className={`${styles.button} ${styles['inherit']} ${styles.svg} ${styles[`svg_top`]}`}
        >
            <CloseSvg></CloseSvg>
        </button>
    );
};
