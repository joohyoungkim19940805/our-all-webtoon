import { from, map, zip } from 'rxjs';
import { Anchor } from '@components/anchor/Anchor';
import styles from './FindAccountInfoContainer.module.css';
import { Link } from 'react-router-dom';

export const FindAccountInfo = () => {
    return (
        <>
            <div className={styles['find-account-info-container']}>
                <Link
                    to="/page/layer/sing-up"
                    className={styles['find-account-info-container']}
                    style={{ justifyContent: 'flex-start' }}
                >
                    회원 가입
                </Link>
                <div className={styles['find-account-info-container']}>
                    <Link to="/">아이디 찾기</Link>
                    <Link to="/">비밀번호 찾기</Link>
                </div>
            </div>
        </>
    );
};
