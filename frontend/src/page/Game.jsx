import * as React from 'react'
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { socket } from '../socket';
import { PlayerBox } from '../components/PlayerBox';
import { startGame } from '../function';
import { LyricBox } from '../components/LyricBox';
import { AnswerField } from '../components/AnswerField';
import { Lyrics } from '../components/Lyric';

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
        <Box sx={{ display: 'flex', padding:'30px', justifyContent: 'space-between', alignItems: 'center' }}>
            <PlayerBox>
                <h1>Box 1</h1>
            </PlayerBox>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', rowGap: '50px' }}>
                <div>Countdown: {counter}</div>
                <LyricBox>
                    <Lyrics></Lyrics>
                </LyricBox>
                <AnswerField></AnswerField>
            </Box>
            <PlayerBox>
                <h1>Box 2</h1>
            </PlayerBox>
        </Box>
    )
}