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
