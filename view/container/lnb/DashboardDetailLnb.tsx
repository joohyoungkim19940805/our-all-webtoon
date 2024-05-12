import { FlexContainer, FlexLayout } from '@wrapper/FlexLayout';
import listScrollStyle from '@root/listScroll.module.css';
import { forwardRef } from 'react';
import styles from './DashboardLng.module.css';
export const DashboardDetailLnb = forwardRef<HTMLUListElement>((_, ref) => {
    return (
        <ul
            ref={ref}
            className={`${styles.dashboard} ${listScrollStyle['list-scroll']} ${listScrollStyle.y}`}
        >
            <li>
                <button type="button">대시보드 메인</button>
            </li>

            <li>
                <button type="button">회차 등록</button>
            </li>

            <li>
                <button type="button">협업 초대 및 권한 설정</button>
            </li>

            <li>
                <button type="button">메신저</button>
            </li>

            <li>
                <button type="button">게시판</button>
            </li>

            <li>
                <details>
                    <summary style={{ fontSize: '2rem' }}>
                        <strong>작업 공간</strong>
                    </summary>
                    <ul>
                        <li>
                            <button
                                type="button"
                                data-url_info="https://www.celsys.com/en/service/creative/"
                            >
                                클립 스튜디오 페인트(미구현)
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                data-url_info="https://medibangpaint.com/en/pc/"
                            >
                                메디방 페인트 프로 X(미구현)
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                data-url_info="https://www.pixton.com/welcome"
                            >
                                Pixton(미구현)
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                data-url_info="https://krita.org/en/download/"
                            >
                                Krita(미구현)
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                data-url_info="https://opentoonz.github.io/e/"
                            >
                                OpenToonz
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                data-url_info="https://www.reallusion.com/"
                            >
                                Cartoon Animator(미구현)
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                data-url_info="https://www.toonboom.com/"
                            >
                                Toon Boom(미구현)
                            </button>
                        </li>
                    </ul>
                </details>
            </li>
        </ul>
    );
});
