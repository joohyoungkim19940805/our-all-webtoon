import { Subject, catchError, map, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { UserlaneSvg } from '@components/svg/UserlaneSvg';

import styles from './Button.module.css';
import { myHomeService } from '@handler/service/GnbService';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useIsLoignService } from '@handler/service/AccountService';
import { useState } from 'react';

// 마이페이지 버튼
export const locationPath = '/page/gnb/my-home';
export const MyHomeButton = () => {
    const location = useLocation();

    const subscription = useIsLoignService(locationPath);
    return (
        <button
            //to={`/page/gnb/my-home`}
            type="button"
            className={`${styles.button} ${styles['short']} ${styles.svg} ${styles[`svg_top`]} ${locationPath === location.pathname && styles[`active`]}`}
            onClick={(event) => {
                console.log(location);
                if (location.pathname === locationPath) return;
                const unsubscribe = subscription.subscribe();
                return () => {
                    unsubscribe.unsubscribe();
                };
                // $globalDimLayer.next(<LoginContainer></LoginContainer>);
            }}
        >
            MY
            <UserlaneSvg></UserlaneSvg>
        </button>
    );
};
