import { styled, Box } from '@mui/material';

export const LyricBox = styled(Box)(({ theme }) =>({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    alignContent: 'space-between',
    // border: '1px solid black',
    height: '45vh',
    width: '50vw',
    padding: '15px',
    textAlign: 'center'
}))
