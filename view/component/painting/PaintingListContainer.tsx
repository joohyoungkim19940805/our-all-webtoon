import { globalBottomLayerSubject } from '@component/layer/GlobalBottomLayer';
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Link as MuiLink,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const PaintingListContainer = () => {
    const navigate = useNavigate();
    const isAuthor = false;
    const recentWebtoons = [
        { title: 'abcd', id: 'abcd' },
        { title: 'abcd', id: 'abcd2' },
        { title: 'abcd', id: 'abcd3' },
        { title: 'abcd', id: 'abcd4' },
    ];
    const handleClose = () => {
        globalBottomLayerSubject.next({
            openState: false,
            layerName: 'paintingLayer',
            children: null,
        });
    };

    const handleDashboardRedirect = () => {
        // 작가 대시보드로 이동하는 로직을 구현합니다.
        //navigate('/dashboard');
        window.location.href = '/dashboard';
        handleClose();
    };

    const handleAuthorRegister = () => {
        // 작가 등록 페이지로 이동하는 로직을 구현합니다.
        //navigate('/dashboard/register');
        window.location.href = '/dashboard/register';
        handleClose();
    };

    const handleRegisterWebtoon = () => {
        // 웹툰 등록 페이지로 이동
        //navigate('/dashboard/register-webtoon');
        window.location.href = '/dashboard/register-webtoon';
        handleClose();
    };

    return (
        <Box
            sx={{
                p: 2,
                position: 'relative',
                border: '3px solid',
                borderBottom: 'none',
                borderRadius: '10px 10px 0 0',
                display: 'flex',
                height: 'auto',
                justifyContent: 'center',
                width: '80dvw',
                borderColor: '#464646',
            }}
        >
            {/* 닫기 버튼 */}
            <IconButton
                onClick={handleClose}
                sx={{ position: 'absolute', top: 8, right: 8 }}
                aria-label="close"
            >
                <CloseIcon />
            </IconButton>
            {(isAuthor && (
                // 작가인 경우 보여줄 내용
                <Box
                    sx={{
                        textAlign: 'center',
                        mt: 4,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        웹툰 등록하기
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        새로운 웹툰을 등록하고 관리하세요.
                    </Typography>

                    {/* 웹툰 등록하기 버튼 */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRegisterWebtoon}
                        sx={{ mb: 2 }}
                        fullWidth
                    >
                        웹툰 등록하기
                    </Button>

                    {/* 최근 등록한 웹툰 목록 */}
                    {recentWebtoons && recentWebtoons.length > 0 && (
                        <>
                            <Typography variant="subtitle1" sx={{ mt: 2 }}>
                                최근 등록한 웹툰
                            </Typography>
                            <List>
                                {recentWebtoons.map(webtoon => (
                                    <ListItem key={webtoon.id}>
                                        <ListItemText primary={webtoon.title} />
                                    </ListItem>
                                ))}
                            </List>
                        </>
                    )}
                </Box>
            )) || (
                <Box
                    sx={{
                        textAlign: 'center',
                        mt: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        웹툰 등록을 위해 작가 대시보드로 이동하세요
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        작가 대시보드에서 새로운 웹툰을 등록하고 관리할 수
                        있습니다.
                    </Typography>

                    {/* 대시보드로 이동 버튼 */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDashboardRedirect}
                        sx={{ mb: 2 }}
                        fullWidth
                    >
                        대시보드로 이동하기
                    </Button>

                    {/* 작가 등록 안내 */}
                    <Typography variant="body2">
                        아직 작가로 등록되지 않았나요?{' '}
                        <MuiLink
                            component="button"
                            onClick={handleAuthorRegister}
                        >
                            지금 등록하기
                        </MuiLink>
                    </Typography>
                </Box>
            )}
            {/* 콘텐츠 영역 */}
        </Box>
    );
};
