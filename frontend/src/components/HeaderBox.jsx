import { styled, Box } from '@mui/material';

// This is the header bar where logout and PRESTO is used
export const HeaderBox = styled(Box)(({ theme }) =>({
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'nowrap',
  alignItems: 'center',
  height: '8vh',
  padding: '20px'
}))
