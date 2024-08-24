import * as React from 'react'
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { socket } from '../socket';
import { PlayerBox } from '../components/PlayerBox';
import { startGame } from '../function';

export const Game = () => {
    let url = window.location.href;
    url = url.split('/');
    const code = url[4];
    const [counter, setCounter] = React.useState(10);

    // Third Attempts
    React.useEffect(() => {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        counter == 0 && setCounter(10)
      return () => clearInterval(timer);
    }, [counter]);

    return (
        <Box sx={{ display: 'flex', padding:'30px'}}>
             <div>Countdown: {counter}</div>
            <PlayerBox>
                <h1>hi</h1>
            </PlayerBox>
        </Box>
    )
}