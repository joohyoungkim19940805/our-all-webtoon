import { Link } from 'react-router-dom';
import styles from './MyWebtoonListContainer.module.css';
import anchorStyles from '@components/anchor/Anchor.module.css';
import { useEffect, useState } from 'react';
import { callApi, createSSEObservable } from '@handler/service/CommonService';
import { WebtoonListResponse } from '@type/service/WebtoonType';
import { EyeSvg } from '@svg/EyeSvg';
import { Counter } from '@components/counter';
import { HeartSvg } from '@svg/HeartSvg';
import { CommentSvg } from '@svg/CommentSvg';

export const MyWebtoonListContainer = () => {
    const [webtoonList, setWebtoonList] = useState<Array<WebtoonListResponse>>(
        [],
    );
    useEffect(() => {
        const subscribe = createSSEObservable<WebtoonListResponse>(
            '/api/webtoon/search/list',
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
    //https://manatoki333.net/data/file/comic/526342/19200461/thumb-mlZHrEwjMXS0_240x320.jpg
    return (
        <>
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
            <flex-layout data-direction="row">
                <flex-container
                    data-is_resize={false}
                    data-panel_mode="default"
                >
                    <div className={`${styles['my-webtoon-list-item']}`}>
                        <img src="https://manatoki333.net/data/file/comic/526342/19200461/thumb-mlZHrEwjMXS0_240x320.jpg"></img>
                        <div className={`${styles['my-webtoon-info']}`}>
                            <div>
                                <span>
                                    믿었던 동료들에게 던전 오지에서 살해당할
                                    뻔했지만 기프트 『무한 가챠』로 레벨 9999의
                                    동료들을 손에 넣어 전 파티 멤버와 세계에
                                    복수&『참교육!』합니다!
                                </span>
                            </div>
                            <div>최신 회차 등록일</div>
                            <div>다음 연재 예정일</div>
                            <div>
                                <Counter count={777} svg={<EyeSvg />}></Counter>
                                <Counter
                                    count={888}
                                    svg={<HeartSvg />}
                                ></Counter>
                                <Counter
                                    count={999}
                                    svg={<CommentSvg />}
                                ></Counter>
                            </div>
                        </div>
                    </div>
                </flex-container>
            </flex-layout>
        </>
    );
    // return (
    //     <flex-layout data-direction="column">
    //         <flex-container
    //             data-is_resize={false}
    //             data-panel_mode="default"
    //             data-grow={0.5}
    //         >
    //             <div className={`${styles['add-webtoon-container']}`}>
    //                 <Link
    //                     className={`${anchorStyles.link} ${anchorStyles.none}`}
    //                     to="/dashboard/painting"
    //                 >
    //                     <div className={`${styles['move-painting']}`}>
    //                         <h2>+</h2>
    //                         <h1>웹툰 등록하기</h1>
    //                     </div>
    //                 </Link>
    //             </div>
    //         </flex-container>
    //         <flex-container
    //             data-is_resize={false}
    //             data-panel_mode="default"
    //             data-grow={0.3}
    //         >
    //             <div
    //                 className={`${styles['my-webtoon-list']} ${styles['head']}`}
    //             >
    //                 <div>썸네일</div>
    //                 <div>제목</div>
    //                 <div>최신 회차 등록일</div>
    //                 <div>다음 연재 예정일</div>
    //                 <div>누적 조회수</div>
    //             </div>
    //         </flex-container>
    //         <flex-container data-is_resize={false} data-panel_mode="default">
    //             <div
    //                 className={`${styles['my-webtoon-list']} ${styles['body']}`}
    //             >
    //                 <div>
    //                     <img src=""></img>
    //                 </div>
    //                 <div>
    //                     <span>제목</span>
    //                 </div>
    //                 <div>최신 회차 등록일</div>
    //                 <div>다음 연재 예정일</div>
    //                 <div>누적 조회수</div>
    //             </div>
    //         </flex-container>
    //     </flex-layout>
    // );
};
