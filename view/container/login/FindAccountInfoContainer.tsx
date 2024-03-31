import { from, map, zip } from 'rxjs';
import { Anchor } from '@components/anchor/Anchor';
import styles from './FindAccountInfoContainer.module.css';

export const FindIdAnchor = () => {
    return <Anchor textContent="아이디 찾기"></Anchor>;
};

export const FindPasswordAnchor = () => {
    return <Anchor textContent="비밀번호 찾기"></Anchor>;
};

export const FindAccountInfo = () => {
    return (
        <div className={styles['find-account-info-container']}>
            <FindIdAnchor></FindIdAnchor>
            <FindPasswordAnchor></FindPasswordAnchor>
        </div>
    );
};
