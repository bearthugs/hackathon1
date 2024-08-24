import { Box, styled } from '@mui/material';

export const NameBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  gap: '40px',
  margin: '40px auto',
  height: 'fit-content',
  color: 'white',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center'
}))
export const GeneralBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '20px',
  backgroundColor: theme.palette.secondary.light,
  borderRadius: '3px',
  height: '60px',
  width: '120px',
  textAlign: 'center',
  alignContent: 'center',
  justifyContent: 'center',
  alignItems: 'center'
}))


