import { WebtoonEpisodeType } from '@type/WebtoonEpisodeType';

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
                        <li>
                            <div>
                                <div>
                                    <img src="/"></img>
                                </div>
                                <div>
                                    <span>{item.title}</span>
                                    <span>{item.episode.subTitle}</span>
                                    <span>{`[ ${item.episode.chapter}화 ]`}</span>
                                </div>
                                <div>
                                    <span>
                                        {new Date(
                                            item.episode.createAt,
                                        ).toLocaleString()}
                                    </span>
                                    <span>{item.episode.views || 0}</span>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
