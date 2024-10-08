import { styled } from '@mui/material';
import Select from '@mui/material/Select';

// These are styled componenets used in registration and login
export const MySelect = styled(Select)({
  backgroundColor:'white',
  marginBottom: '10px',
  fontSize: '1em'
})

export const FormBox = styled('form')(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.secondary.light,
  width: '50%',
  padding: '50px',
  flexDirection: 'column',
  gap: '20px',
  margin: '60px auto',
  height: 'fit-content',
  color: 'white'
}))

export const InputBox = styled('input')({
  width: '100%',
  float: 'left',
  marginBottom: '10px',
  padding: '20px',
  border: 'none',
  fontSize: '1em'
})

export const LabelInput = styled('label')({
  marginRight: '10%',
  width: '100%',
  fontSize: '1em'
})


