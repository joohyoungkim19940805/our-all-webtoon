import styles from './WebtoonFilterBar.module.css';
import selectStyles from '@components/select/Select.module.css';

export const WebtoonFilterBar = () => {
    return (
        <div className={styles['webtoon-filter-box']}>
            <div className={styles['sort']}>
                <select className={selectStyles.select}>
                    <option>업데이트순</option>
                    <option>조회수순</option>
                    <option>별점순</option>
                </select>
            </div>
            <div className={styles['sex-age']}>
                <select className={`${selectStyles.select} ${styles.sex}`}>
                    <option>성별 전체</option>
                    <option>남자</option>
                    <option>여자</option>
                </select>
                <select className={`${selectStyles.select} ${styles.age}`}>
                    <option>연령 전체</option>
                    <option>10대</option>
                    <option>20대</option>
                    <option>30대</option>
                    <option>40대</option>
                    <option>50대</option>
                    <option>60대</option>
                    <option>70대 이상</option>
                </select>
            </div>
            <div className={styles['list-column']}>
                <select className={selectStyles.select}>
                    <option>한줄</option>
                    <option>두줄</option>
                </select>
            </div>
        </div>
    );
};
