import { Subject, catchError, map, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { UserlaneSvg } from '@components/svg/UserlaneSvg';

import styles from './Button.module.css';
import { myHomeService } from '@handler/service/GnbService';
import { Link, useLocation } from 'react-router-dom';

// 마이페이지 버튼
export const myHomeButtonEvent = new Subject<Event>();
export const MyHomeButton = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    //link to에 isLogin으로 분기처리 시키기 20240502
    return (
        <Link
            to={`/page/layer/login-layer`}
            //type="button"
            className={`${styles.button} ${styles['short']} ${styles.svg} ${styles[`svg_top`]}`}
            onClick={() => {
                const subscribe = myHomeService.subscribe({
                    next: (value) => console.log(value),
                    error: (err) => console.log(err),
                });
                // $globalDimLayer.next(<LoginContainer></LoginContainer>);
            }}
        >
            MY
            <UserlaneSvg></UserlaneSvg>
        </Link>
    );
};
