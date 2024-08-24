import * as React from 'react'
import Box from '@mui/material/Box';
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
        <Box>
          <Heading theme='3em'>Your Room Code is:</Heading>
          <Heading sx={{marginLeft:'30%'}}theme='5em'>{code}</Heading>
          <>Waiting for players to join...</>
        </Box>
    )
}

// room code

// easy, medium, hard
