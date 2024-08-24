import * as React from 'react'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { socket } from '../socket';


export const Final = () => {
    const nav = useNavigate()
    const [users, setUsers] = React.useState([])
    const [score, setScore] = React.useState(0)

    let url = window.location.href;
    url = url.split('/');
    const code = url[4];
    socket.emit('winner', code)
    socket.on('displayWin', async (question) => {
      setUsers(question.winner[0])
      setScore(question.winner[1])
    })
    return (
      <Box sx={{ padding: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', gap:'30px' }}>
      <Typography variant='h3'>The Winner Is...</Typography>
      {users.map((fruit) => (
                  <Typography variant='h2' sx={{fontSize:'10em'}}>{fruit}</Typography>
                ))
          }
      <Typography variant='h4'>Who guessed {score} songs! WOW</Typography>
      <Button size='large' variant="contained" color="primary" onClick={() => {nav('/home')}}>Home</Button>
    </Box>
    )
}

//name
//score
// home
