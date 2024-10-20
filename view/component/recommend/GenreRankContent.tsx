import { useShiftDownScrollWheelX } from '@handler/hooks/ScrollHooks';
import { useVisibleSliderPaging } from '@handler/hooks/SliderHooks';
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import scrollStyles from '@root/listScroll.module.css';
import { useRef, useState } from 'react';

// 테스트 데이터
const testData = [
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
    '/image/test.png',
];

export const GenreRankContainer = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const listRef = useRef<HTMLDivElement | null>(null);
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
    const { isShft } = useShiftDownScrollWheelX(listRef);
    const {
        isMouseDown,
        setIsMouseDown,
        hanldeScrollIntoView,
        visibleObserver,
        visibleTarget,
        page,
        setPage,
    } = useVisibleSliderPaging();

    const handleWheel = (ev: React.WheelEvent<HTMLDivElement>) => {
        if (!listRef.current) return;
        listRef.current.scrollTo({
            left:
                listRef.current.clientWidth *
                (currentIndex + Math.sign(ev.deltaY)),
            behavior: 'smooth',
        });
    };

    const handleScroll = (ev: React.UIEvent<HTMLDivElement, UIEvent>) => {
        if (!listRef.current) return;
        const newIndex = Math.round(
            listRef.current.scrollLeft / listRef.current.clientWidth
        );
        setCurrentIndex(newIndex);
    };

    const handleIndexClick = (index: number) => {
        if (!listRef.current) return;
        const containerWidth = listRef.current.clientWidth;
        const scrollLeft = index * containerWidth;
        listRef.current.scrollTo({
            left: scrollLeft,
            behavior: 'smooth',
        });
        setCurrentIndex(index);
    };

    return (
        <Box sx={{}}>
            {/* 스크롤 가능한 컨테이너 */}
            <Box
                ref={listRef}
                sx={{
                    width: '80dvw',
                    display: 'flex',
                    overflowX: 'scroll',
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    gap: '0.7rem',
                    padding: '1rem',
                }}
                className={`${scrollStyles['list-scroll']} ${scrollStyles.x}`}
                onMouseDown={() => setIsMouseDown(true)}
                onMouseUp={() => {
                    setIsMouseDown(false);
                    hanldeScrollIntoView(visibleTarget);
                }}
                onWheel={ev => handleWheel(ev)}
                onScrollCapture={ev => handleScroll(ev)}
                onMouseMove={event => {
                    if (!listRef.current || !isMouseDown) return;
                    listRef.current.scrollLeft -= event.movementX;
                }}
                onTouchEnd={() => {
                    setIsMouseDown(true);
                    hanldeScrollIntoView(visibleTarget);
                }}
            >
                {testData
                    .reduce(
                        (t, e, i) => (
                            i % 3 === 0 ? t.push([e]) : t[t.length - 1].push(e),
                            t
                        ),
                        [] as string[][]
                    )
                    .map((items, groupIndex) => (
                        <Box
                            key={groupIndex}
                            sx={{
                                flex: '0 0 100%',
                                display: 'flex',
                                scrollSnapAlign: 'start',
                            }}
                        >
                            {items.map((src, index) => (
                                <Box
                                    key={groupIndex + index}
                                    sx={{
                                        flex: '1 0 32.5%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            overflow: 'hidden',
                                            margin: '0.5rem',
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={src}
                                            alt={`Genre Rank ${groupIndex}-${index}`}
                                            draggable={false}
                                            sx={{
                                                height: '11dvh',
                                                maxWidth: '6rem',
                                                width: '100%',
                                                userSelect: 'none',
                                            }}
                                        />
                                    </Paper>
                                </Box>
                            ))}
                        </Box>
                    ))}
            </Box>

            {/* 페이지 인디케이터 */}
            <Box
                sx={{
                    textAlign: 'center',
                    marginTop: '1rem',
                    gap: '5dvw',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {[...new Array(Math.ceil(testData.length / 3))].map((_, i) => (
                    <Box
                        key={i}
                        onClick={() => handleIndexClick(i)}
                        sx={{
                            display: 'inline-block',
                            width: '0.89rem',
                            height: '0.89rem',
                            borderRadius: '50%',
                            backgroundColor:
                                i === currentIndex ? '#003366' : '#cccccc',
                            borderColor:
                                i === currentIndex
                                    ? 'hsl(80.83deg 100% 53.7% / 23%)'
                                    : '#cccccc',
                            transition: 'background-color 0.3s ease',
                            cursor: 'pointer',
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default GenreRankContainer;
