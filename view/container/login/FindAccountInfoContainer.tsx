import { from, map, zip } from 'rxjs';
import { Anchor } from '@components/anchor/Anchor';
import styles from './FindAccountInfoContainer.module.css';

export const FindAccountInfo = () => {
    return (
        <div className={styles['find-account-info-container']}>
            <a className={styles['find-account-info-container']}>회원 가입</a>
            <div className={styles['find-account-info-container']}>
                <a>아이디 찾기</a>
                <a>비밀번호 찾기</a>
            </div>
        </div>
    );
};
