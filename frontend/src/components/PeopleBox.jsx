import { Box, styled } from '@mui/material';

export const PeopleBox = styled(Box)(({ theme }) => ({
  height: 'fit-content',
  margin: '5px',
  marginLeft: '15px',
  marginRight: '15px',
  padding: '10px',
  backgroundColor: theme.palette.secondary.main,
  fontSize: '1.5em'
}))
