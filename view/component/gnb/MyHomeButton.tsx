import { StandardButton } from '@component/StandardButton';
import { useIsLogin } from '@handler/service/AccountService';
import { UserlaneSvg } from '@svg/UserlaneSvg';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Subscription } from 'rxjs';

export const MyHomeButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLogin: myHomeLogin, checkLogin } = useIsLogin();
    const subscriptionRef = useRef<Subscription>();

    useEffect(() => {
        if (myHomeLogin) {
            navigate('/page/user/my-home');
        }
    }, [myHomeLogin, navigate]);

    useEffect(() => {
        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        };
    }, []);

    const handleClick = () => {
        if (location.pathname === '/page/user/my-home') return;
        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
        }
        subscriptionRef.current = checkLogin();
    };

    return (
        <StandardButton onClick={handleClick} className="short top">
            <UserlaneSvg />
            MY
        </StandardButton>
    );
};
