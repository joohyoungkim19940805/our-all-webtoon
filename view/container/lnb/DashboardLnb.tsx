import { FlexContainer, FlexLayout } from '@wrapper/FlexLayout';
import listScrollStyle from '@root/listScroll.module.css';
export const DashboardLng = () => {
    return (
        <flex-container
            data-is_resize={true}
            data-panel_mode="default"
            data-grow={0}
        >
            <div>
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
            </div>
        </flex-container>
    );
};
