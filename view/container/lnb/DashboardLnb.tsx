import { FlexContainer, FlexLayout } from '@wrapper/FlexLayout';
import listScrollStyle from '@root/listScroll.module.css';
import { forwardRef } from 'react';
import styles from './DashboardLng.module.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import anchorStyles from '@components/anchor/Anchor.module.css';

export const DashboardLnb = forwardRef<HTMLUListElement>((_, ref) => {
    const location = useLocation();
    return (
        <ul
            ref={ref}
            className={`${styles.dashboard} ${listScrollStyle['list-scroll']} ${listScrollStyle.y}`}
        >
            <li>
                <Link
                    className={`${anchorStyles.link} ${anchorStyles.none} ${location.pathname === '/dashboard/' || (location.pathname === '/dashboard' && anchorStyles.active) || ''}`}
                    to="/dashboard"
                >
                    내 웹툰 목록
                </Link>
            </li>
            <li>
                <Link
                    className={`${anchorStyles.link} ${anchorStyles.none} ${(location.pathname === '/dashboard/collaboration' && anchorStyles.active) || ''}`}
                    to="/dashboard/collaboration"
                >
                    협업 요청하기
                </Link>
            </li>
            <li>
                <Link
                    className={`${anchorStyles.link} ${anchorStyles.none} ${(location.pathname === '/dashboard/profile' && anchorStyles.active) || ''}`}
                    to="/dashboard/profile"
                >
                    내 프로필
                </Link>
            </li>
        </ul>
    );
});
