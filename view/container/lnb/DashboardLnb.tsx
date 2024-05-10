import { FlexContainer, FlexLayout } from '@wrapper/FlexLayout';
import listScrollStyle from '@root/listScroll.module.css';
export const DashboardLnb = () => {
    return (
        <ul
            className={`${listScrollStyle['list-scroll']} ${listScrollStyle.y}`}
        >
            <li>
                <button type="button">내 웹툰 목록</button>
            </li>
            <li>
                <button type="button">협업 요청하기</button>
            </li>
        </ul>
    );
};
