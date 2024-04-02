import styles from './GenreRankContent.module.css';
//import styles from '@root/'

export const GenreRankContent = () => {
    return (
        <div>
            <ul className={styles['genre-rank-list-container']}>
                <li className={styles['genre-rank-list-item']}>
                    <img src="/image/test.png"></img>
                </li>
                <li className={styles['genre-rank-list-item']}>
                    <img src="/image/test.png"></img>
                </li>
                <li className={styles['genre-rank-list-item']}>
                    <img src="/image/test.png"></img>
                </li>
                <li className={styles['genre-rank-list-item']}>
                    <img src="/image/test.png"></img>
                </li>
                <li className={styles['genre-rank-list-item']}>
                    <img src="/image/test.png"></img>
                </li>
            </ul>
        </div>
    );
};
