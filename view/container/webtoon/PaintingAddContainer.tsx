import styles from './PaintingAddContainer.module.css';

export const PaintingAddContainer = () => {
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
