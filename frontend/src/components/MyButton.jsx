import { styled } from '@mui/material';
import Button from '@mui/material/Button';
// These are styled componenets used in registration and login
export const MyButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  fontSize: '2em'
}))