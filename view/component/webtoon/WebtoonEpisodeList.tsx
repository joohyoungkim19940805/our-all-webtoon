import { EyeSvg } from '@component/svg/EyeSvg';
import { WebtoonViewCounter } from '@component/webtoon/WebtoonViewCounter';
import { touchShowScrollHandle } from '@handler/hooks/ScrollHooks';
import {
    $filterBarChange,
    Way,
    wayValues,
} from '@handler/subject/FilterBarEvent';
import { Box, Grid2, Typography } from '@mui/material';
import scrollStyles from '@root/listScroll.module.css';
import { WebtoonEpisodeType } from '@type/service/WebtoonEpisodeType';
import { useEffect, useRef, useState } from 'react';

const testWebtoonList = [
    [...new Array(20)],
    [...new Array(20)],
    [...new Array(20)],
    [...new Array(20)],
    [...new Array(20)],
    [...new Array(20)],
].map(arr =>
    arr.map(() => {
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
    })
);

export const WebtoonEpisodeList = () => {
    const [way, setWay] = useState<Way | undefined>();
    const listRef = useRef<HTMLDivElement>(null);
    const { handleTouchStart, handleTouchEnd } = touchShowScrollHandle(listRef);

    useEffect(() => {
        const subscribe = $filterBarChange.subscribe(({ value }) => {
            if (!value || !wayValues.some(e => e[0] === value[0])) return;
            setWay(value as Way);
        });
        return () => {
            subscribe.unsubscribe();
        };
    }, [listRef]);

    return (
        <Box
            ref={listRef}
            className={`${scrollStyles['list-scroll']} ${scrollStyles['y']}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <Grid2
                container
                spacing={2}
                sx={{
                    p: '1.5dvw',
                    justifyContent: 'center',
                    '& > .MuiGrid2-root': {
                        flexBasis: !way || way[0] == 'one_way' ? '100%' : '45%', // 자식 요소들의 width 제어
                        paddingRight: '0.7rem',
                    },
                }}
            >
                {testWebtoonList[0].map((item, i) => {
                    const { title, episode } = item;
                    return (
                        <Grid2
                            key={i}
                            sx={{
                                display: 'flex',
                                flexDirection:
                                    !way || way[0] == 'one_way'
                                        ? 'row'
                                        : 'column',
                                gap: '1rem',
                                borderBottom: '1px solid #a3a3a3',
                                paddingBottom: '0.7rem',
                                paddingTop: '0.7rem',
                                textWrap: 'pretty',
                                boxSizing: 'border-box',
                                fontSize:
                                    !way || way[0] == 'one_way'
                                        ? '1.132rem'
                                        : '0.95rem',
                            }}
                        >
                            {/* 썸네일 */}
                            <Box
                                sx={{
                                    flex: '0 0 auto',
                                    width: '18%',
                                    minWidth: '10dvh',
                                    img: {
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'cover',
                                    },
                                }}
                            >
                                <img
                                    src="https://manatoki333.net/data/file/comic/526342/19200461/thumb-mlZHrEwjMXS0_240x320.jpg"
                                    alt="썸네일"
                                />
                            </Box>

                            {/* 에피소드 제목 및 정보 */}
                            <Box
                                sx={{
                                    flex: '1 1 auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    gap: 1,
                                }}
                            >
                                {/* 제목 및 챕터 */}
                                <Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            fontSize: '1rem',
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '1rem',
                                        }}
                                    >
                                        {`${episode.chapter} 화`}
                                        <Typography
                                            component="span"
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: '0.9rem',
                                                marginLeft: 0.5,
                                            }}
                                        >
                                            - {episode.subTitle}
                                        </Typography>
                                    </Typography>
                                </Box>

                                {/* 날짜 및 조회수 */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: 1,
                                        color: 'text.secondary',
                                        fontSize: '0.9rem',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <Typography variant="body2">
                                        {new Date(
                                            episode.createAt
                                        ).toLocaleString('ko-KR', {
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </Typography>
                                    <WebtoonViewCounter
                                        count={episode.views || 0}
                                        svg={<EyeSvg />}
                                    />
                                </Box>

                                {/* 작가 이름 및 장르 */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        color: 'text.secondary',
                                        fontSize: '0.9rem',
                                        marginTop: 1,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <Typography>작가 이름</Typography>
                                    <Typography>장르 종류</Typography>
                                </Box>
                            </Box>
                        </Grid2>
                    );
                })}
            </Grid2>
        </Box>
    );
};
