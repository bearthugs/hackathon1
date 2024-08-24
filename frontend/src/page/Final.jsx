import * as React from 'react'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';


export const Final = () => {
    const nav = useNavigate()
    return (
      <Box sx={{ padding: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', gap:'30px' }}>
      <Typography variant='h3'>The Winner Is...</Typography>
      <Typography variant='h2' sx={{fontSize:'10em'}}>ME!</Typography>
      <Typography variant='h4'>ME guessed 52 songs! WOW</Typography>
      <Button size='large' variant="contained" color="primary" onClick={() => {nav('/home')}}>Home</Button>
    </Box>
    )
}

//name
//score
// home
