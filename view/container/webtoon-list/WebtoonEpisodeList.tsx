import { WebtoonEpisodeType } from '@type/WebtoonEpisodeType';
import styles from './WebtoonEpisodeList.module.css';
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
    return (
        <div>
            <ul>
                {testWebtoonList[0].map((item) => {
                    return (
                        <li
                            className={`${styles['webtoon-episode-container']}`}
                        >
                            <div className={`${styles['episode-thumbnail']}`}>
                                <img src="https://manatoki333.net/data/file/comic/526342/19200461/thumb-mlZHrEwjMXS0_240x320.jpg"></img>
                            </div>
                            <div className={`${styles['episode-title']}`}>
                                <div className={`${styles['title-wrapper']}`}>
                                    <div className={`${styles['title']}`}>
                                        {item.title}
                                    </div>
                                    <div className={`${styles['chapter']}`}>
                                        {`${item.episode.chapter} 화`}
                                        <span
                                            className={`${styles['sub-title']}`}
                                        >
                                            {item.episode.subTitle}
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
                                    {new Date(
                                        item.episode.createAt,
                                    ).toLocaleString()}
                                </div>
                                <div className={`${styles['views']}`}>
                                    {item.episode.views || 0}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
