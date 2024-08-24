import * as React from 'react'
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Heading } from '../components/Heading';
import { socket } from '../socket';


export const Room = () => {
  let url = window.location.href;
  url = url.split('/');
  const code = url[4]
  // socket.on('connect', true);
  // React.useEffect(() =>{
  //   socket.on('userjoin', async (name) => {
  //     console.log(name)
  //   })
  //   return () => {
  //     socket.off('userjoin')
  //   };
  // }, [])
    return (
        <Box sx={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', gap:'30px' }}>
          <Typography variant='h2'>Your Room Code is:</Typography>
          <Typography variant='h3'>{code}</Typography>
          <Typography variant='h4'>Waiting for players to join...</Typography>
        </Box>
    )
}

// room code

// easy, medium, hard
