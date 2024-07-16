import { Link } from 'react-router-dom';
import styles from './MyWebtoonListContainer.module.css';
import anchorStyles from '@components/anchor/Anchor.module.css';
import { useEffect } from 'react';
import { callApi, createSSEObservable } from '@handler/service/CommonService';

export const MyWebtoonListContainer = () => {
    useEffect(() => {
        const subscribe = createSSEObservable(
            'http://localhost:4568/api/webtoon/search/list',
        ).subscribe({
            next: (data) => console.log(data),
            error: (err) => console.error('Error:', err),
            complete: () => console.log('Stream complete'),
        });
        return () => {
            subscribe.unsubscribe();
        };
    });
    /*
    useEffect(() => {
        const subscribe = callApi<unknown, string>({
            method: 'GET',
            path: 'webtoon',
            endpoint: 'list',
            headers: {
                'Content-Type': 'text/event-stream',
            },
        }).subscribe({
            next: (result) => {
                console.log(result);
            },
            complete: () => {},
        });
        return () => {
            subscribe.unsubscribe();
        };
    });
    */
    return (
        <flex-layout data-direction="column">
            <flex-container
                data-is_resize={false}
                data-panel_mode="default"
                data-grow={0.5}
            >
                <div className={`${styles['add-webtoon-container']}`}>
                    <Link
                        className={`${anchorStyles.link} ${anchorStyles.none}`}
                        to="/dashboard/painting"
                    >
                        <div className={`${styles['move-painting']}`}>
                            <h2>+</h2>
                            <h1>웹툰 등록하기</h1>
                        </div>
                    </Link>
                </div>
            </flex-container>
            <flex-container
                data-is_resize={false}
                data-panel_mode="default"
                data-grow={0.3}
            >
                <div
                    className={`${styles['my-webtoon-list']} ${styles['head']}`}
                >
                    <div>썸네일</div>
                    <div>제목</div>
                    <div>최신 회차 등록일</div>
                    <div>다음 연재 예정일</div>
                    <div>누적 조회수</div>
                </div>
            </flex-container>
            <flex-container data-is_resize={false} data-panel_mode="default">
                <div
                    className={`${styles['my-webtoon-list']} ${styles['body']}`}
                >
                    <div>
                        <img src=""></img>
                    </div>
                    <div>
                        <span>제목</span>
                    </div>
                    <div>최신 회차 등록일</div>
                    <div>다음 연재 예정일</div>
                    <div>누적 조회수</div>
                </div>
            </flex-container>
        </flex-layout>
    );
};
