import * as React from 'react'
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Heading } from '../components/Heading';
import { socket } from '../socket';
import { NameBox, GeneralBox } from '../components/Names';
import { useNavigate } from 'react-router-dom';

export const Room = () => {
    let url = window.location.href;
    url = url.split('/');
    const code = url[4];
    const [user, setUsers] = React.useState(['name1', 'ame2', 'nsmae3']);
    const nav = useNavigate()

    React.useEffect(() => {
        socket.connect();
        console.log("connecting");

        socket.on('connect', () => {
            console.log('Socket connected');
            socket.emit('test', 'test');
            console.log("emitted");
        });

        socket.on('userjoin', async (name) => {
            console.log(name);
            let newUsers = []
            for (const el of user) {
              newUsers.push(el)
            }
            newUsers.push(name.name)
            console.log(name)
            setUsers(newUsers)
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        return () => {
            socket.off('userjoin');
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    const handleButtonClick = () => {
      socket.emit('startGame', code);
      handleStartGame(nav)
    };

    const handleStartGame = async(nav) => {
      nav(`/game/${code}`)
    }

    return (
        <Box sx={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', gap:'30px', height: '90vh' }}>
          <Typography variant='h2'>Your Room Code is:</Typography>
          <Typography variant='h3'>{code}</Typography>
          <Typography variant='h4'>Waiting for players to join...</Typography>
          <Button size='large' variant="contained" color="primary" onClick={() => {handleButtonClick()}}>Start Game!</Button>
          <Typography sx={{fontWeight:'bold'}}>{user.length} Users have currently joined</Typography>
          <NameBox> 
            {user.map((fruit) => (
                    <GeneralBox>
                        {fruit}
                    </GeneralBox>
                ))
          }</NameBox>

          {/* <Button variant="contained" color="primary" onClick={handleButtonClick}>
              Emit Test Event
          </Button> */}
        </Box>
    );
};