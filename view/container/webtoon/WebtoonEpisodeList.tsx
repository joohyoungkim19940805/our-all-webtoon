import { WebtoonEpisodeType } from '@type/service/WebtoonEpisodeType';
import styles from './WebtoonEpisodeList.module.css';
import scrollStyles from '@root/listScroll.module.css';
import { EyeSvg } from '@svg/EyeSvg';
import React, { useEffect, useRef, useState } from 'react';
import {
    $filterBarChange,
    Way,
    wayValues,
} from '@handler/subject/FilterBarEvent';
import { touchShowScrollHandle } from '@handler/hooks/ScrollHooks';

const testWebtoonList = [
    [...new Array(20)],
    [...new Array(20)],
    [...new Array(20)],
    [...new Array(20)],
    [...new Array(20)],
    [...new Array(20)],
].map((arr) =>
    arr.map((e) => {
        let data: WebtoonEpisodeType = {
            title: `믿었던 동료들에게 던전 오지에서 살해당할 뻔했지만 기프트 『무한 가챠』로 레벨 9999의 동료들을 손에 넣어 전 파티 멤버와 세계에 복수&『참교육!』합니다!`,
            id: 1,
            episode: {
                chapter: 1,
                id: 1,
                kind: 'aaa',
                subTitle: 'abcd',
                thumbnail: '',
                createAt: new Date().getTime(),
                views: 1594,
            },
        };
        return data;
    }),
);

export const WebtoonEpisodeList = () => {
    const [way, setWay] = useState<Way | undefined>();
    const listRef = useRef<HTMLDivElement>(null);
    const { handleTouchStart, handleTouchEnd } = touchShowScrollHandle(listRef);

    useEffect(() => {
        const subscribe = $filterBarChange.subscribe(({ value }) => {
            if (!value || !wayValues.some((e) => e[0] === value[0])) return;

            console.log(value);
            setWay(value as Way);
        });
        return () => {
            subscribe.unsubscribe();
        };
    }, [listRef]);

    return (
        <div
            ref={listRef}
            className={`${scrollStyles['list-scroll']} ${scrollStyles['y']}`}
            {...touchShowScrollHandle}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <ul className={`${styles['webtoon-episode-list']}`}>
                {testWebtoonList[0].map((item, i) => {
                    const { title, id, episode } = item;
                    return (
                        <li
                            key={i}
                            className={`${styles['webtoon-episode-item']} ${styles[way ? way[0] : 'one_way']}`}
                            data-test={way ? way[0] : 'aaa'}
                        >
                            <div className={`${styles['episode-thumbnail']}`}>
                                <img src="https://manatoki333.net/data/file/comic/526342/19200461/thumb-mlZHrEwjMXS0_240x320.jpg"></img>
                            </div>
                            <div className={`${styles['episode-title']}`}>
                                <div className={`${styles['title-wrapper']}`}>
                                    <div className={`${styles['title']}`}>
                                        {title}
                                    </div>
                                    <div className={`${styles['chapter']}`}>
                                        {`${episode.chapter} 화`}
                                        <span
                                            className={`${styles['sub-title']}`}
                                        >
                                            {episode.subTitle}
                                        </span>
                                    </div>
                                </div>
                                <div className={`${styles['episode-info']}`}>
                                    <div>작가 이름</div>
                                    <div>장르 종류</div>
                                </div>
                            </div>
                            <div className={`${styles['episode-at']}`}>
                                <div className={`${styles['at']}`}>
                                    {new Date(episode.createAt).toLocaleString(
                                        'ko-KR',
                                        {
                                            formatMatcher: 'basic',
                                            hourCycle: 'h24',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        },
                                    )}
                                </div>
                                <div className={`${styles['views']}`}>
                                    {episode.views || 0}
                                    <EyeSvg></EyeSvg>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
