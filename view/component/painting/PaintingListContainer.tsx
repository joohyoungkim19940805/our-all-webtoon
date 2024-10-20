import styles from './PaintingListContainer.module.css';

export const PaintingListContainer = () => {
    return (
        <div className={`${styles['painting-container']}`}>
            <ul>
                <li>
                    <h1>작가 대시보드</h1>
                </li>
            </ul>
        </div>
    );
};
