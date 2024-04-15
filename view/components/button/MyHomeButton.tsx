import { Subject, map } from 'rxjs';
import { UserlaneSvg } from '@components/svg/UserlaneSvg';

import styles from './Button.module.css';
import { $globalDimLayer } from '@handler/Subject/LayerEvent';
import { LoginContainer } from '@container/login/LoginContainer';

// 마이페이지 버튼
export const myHomeButtonEvent = new Subject<Event>();
export const MyHomeButton = () => {
    return (
        <button
            type="button"
            className={`${styles.button} ${styles['short']} ${styles.svg} ${styles[`svg_top`]}`}
            onClick={() =>
                $globalDimLayer.next(<LoginContainer></LoginContainer>)
            }
        >
            MY
            <UserlaneSvg></UserlaneSvg>
        </button>
    );
};
