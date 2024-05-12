import { FlexContainer, FlexLayout } from '@wrapper/FlexLayout';
import listScrollStyle from '@root/listScroll.module.css';
import { forwardRef } from 'react';
import styles from './DashboardLng.module.css';
export const DashboardLnb = forwardRef<HTMLUListElement>((_, ref) => {
    return (
        <ul
            ref={ref}
            className={`${styles.dashboard} ${listScrollStyle['list-scroll']} ${listScrollStyle.y}`}
        >
            <li>
                <button type="button">내 웹툰 목록</button>
            </li>
            <li>
                <button type="button">협업 요청하기</button>
            </li>
        </ul>
    );
});
