import { styled, Box } from '@mui/material';

export const PlayerBox = styled(Box)(({ theme }) =>({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    alignContent: 'space-between',
    // border: '1px solid black',
    height: '80vh',
    width: '30vh'
}))
