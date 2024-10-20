import { FlexContainer } from '@component/FlexLayout';
import { MenuSvg } from '@component/svg/MenuSvg';
import { useFirstChildSize } from '@handler/hooks/SizeChangeHooks';
import { $lnbOpenClick } from '@handler/subject/LnbEvent';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';

import BrushIcon from '@mui/icons-material/Brush';
export const Head = () => {
    const bottomRef = useRef<FlexContainer>(null);
    const { ref: gnbRef, sizes: heights } = useFirstChildSize('height');

    useEffect(() => {
        if (!bottomRef.current || !heights || !bottomRef.current.getRoot)
            return;
        const [gnbHeight, gnbFirstChildHeight] = heights;
        bottomRef.current.style.maxHeight = gnbHeight + 'px';
        bottomRef.current.dataset.grow = bottomRef.current.getRoot
            .mathGrow(gnbFirstChildHeight)
            .toString();

        bottomRef.current.getRoot.remain();
    }, [bottomRef, heights]);

    return (
        <flex-container
            data-is_resize={true}
            data-panel_mode="default"
            data-grow={0.2}
            ref={bottomRef}
        >
            <AppBar position="relative" ref={gnbRef} color="primary">
                <Toolbar
                    sx={{
                        justifyContent: 'space-between',
                        width: 'inherit',
                        height: 'inherit',
                        padding: '0 !important', // padding을 0으로 설정
                        minHeight: '0 !important', // minHeight를 0으로 설정
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={ev => $lnbOpenClick.next(ev)}
                        sx={{ pl: 3 }}
                    >
                        <MenuSvg></MenuSvg>
                    </IconButton>
                    {/*중앙 아이콘*/}
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)', // 완전한 중앙
                            textDecoration: 'none',
                        }}
                        component="a"
                        href="/"
                    >
                        {/* 아이콘은 필요에 따라 변경할 수 있습니다 */}
                        <BrushIcon
                            fontSize="large"
                            sx={{ mr: 1, color: '#ffffff' }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                color: '#ffffff',
                            }}
                        >
                            Our Webtoon
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </flex-container>
    );
};
