import styles from './SnsLoginContainer.module.css';

export const SnsLoginContainer = () => {
    return (
        <div className={styles['sns-container']}>
            <ul className={styles['sns-list']}>
                <li className={styles.google}>
                    <a href="/oauth2/authorization/google?kjh-test=1">
                        <img src="/image/google_login.png" />
                    </a>
                </li>
                <li className={styles.naver}>
                    <button type="button">
                        <img src="/image/naver_login.png" />
                    </button>
                </li>
                <li className={styles.kakao}>
                    <button type="button">
                        <img src="/image/kakao_login.png" />
                    </button>
                </li>
                <li className={styles.apple}>
                    <button type="button">
                        <img src="/image/apple_login.png" />
                    </button>
                </li>
            </ul>
        </div>
    );
};
