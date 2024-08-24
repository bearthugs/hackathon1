import { Box, styled } from '@mui/material';

export const NameBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  gap: '40px',
  margin: '40px auto',
  height: 'fit-content',
  color: 'white'
}))

export const GeneralBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '20px',
  backgroundColor: theme.palette.secondary.main,
}))


