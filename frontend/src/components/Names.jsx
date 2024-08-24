import { styled } from '@mui/material';

export const NameBox = styled('box')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  gap: '40px',
  margin: '40px auto',
  height: 'fit-content',
  color: 'white'
}))

export const GeneralBox = styled('box')(({ theme }) => ({
  display: 'flex',
  padding: '20px',
  backgroundColor: theme.palette.secondary.main,
}))


