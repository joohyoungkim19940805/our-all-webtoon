import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const StandardButton = styled(Button)(({ theme }) => ({
    cursor: 'pointer',
    minWidth: 'fit-content',
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: '1rem',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.mode === 'dark' ? '#b9b9b9' : 'inherit',
    '& svg': {
        color: theme.palette.mode === 'dark' ? '#cbc3e3' : '#6f6f6f',
        fontSize: '1.1rem',
    },
    '&.top': {
        flexDirection: 'column',
    },
    '&.bottom': {
        flexDirection: 'column-reverse',
    },
    '&.left': {
        flexDirection: 'row',
    },
    '&.right': {
        flexDirection: 'row-reverse',
    },
    '&.initial': {
        width: 'initial',
    },
    '&.inherit': {
        width: 'inherit',
    },
    '&.long': {
        width: '99.52%',
    },
    '&.middle': {
        width: '49.52%',
    },
    '&.short': {
        width: '19.52%',
        height: '4rem',
    },
}));

export const BlackButton = styled(Button)(({ theme }) => ({
    textWrap: 'nowrap',
    display: 'inline-block',
    padding: '0.7rem 1.4rem',
    cursor: 'pointer',
    background: 'linear-gradient(145deg, #444, #222)' /* 세련된 그라데이션 */,
    color: '#f0f0f0' /* 부드러운 흰색 텍스트 */,
    borderRadius: '12px',
    border: '1px solid #555',
    fontSize: '1rem',
    fontWeight: '600',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' /* 텍스트에 깊이감 추가 */,
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)' /* 입체감 있는 그림자 */,

    '&:hover': {
        background: 'linear-gradient(145deg, #555, #333)',
        transform:
            'translateY(-5px) scale(1.05)' /* 살짝 커지며 위로 올라가는 효과 */,
        boxShadow: '0 12px 20px rgba(0, 0, 0, 0.5)' /* 더 강한 그림자 */,
    },

    '&:active': {
        background: 'linear-gradient(145deg, #333, #111)',
        transform: 'translateY(0) scale(1)',
        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.3)',
        borderColor: '#777',
    },
}));
