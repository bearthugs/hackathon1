import * as React from 'react'
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { socket } from '../socket';
import { PlayerBox } from '../components/PlayerBox';
import { startGame } from '../function';
import { LyricBox } from '../components/LyricBox';
import { AnswerField } from '../components/AnswerField';
import { Lyrics } from '../components/Lyric';
import { PeopleBox } from '../components/PeopleBox';
import { useNavigate } from 'react-router-dom';

export const Game = () => {
    let url = window.location.href;
    url = url.split('/');
    const code = url[4];
    const [counter, setCounter] = React.useState(10);

    const [lyrics, setLyrics] = React.useState([]);
    socket.on('startGame', async (name) => {
        console.log(name);
        // setLyrics(newUsers)
    })
    const nav = useNavigate()
    // Third Attempts
    React.useEffect(() => {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        counter == 0 && setCounter(10) && socket.emit('timeout')
      return () => clearInterval(timer);
    }, [counter]);

    // const handleButtonClick = () => {
    //     socket.emit('startGame', code);
    //     handleStartGame(nav)
    //   };

    return (
        <Box sx={{ display: 'flex', padding:'10px', paddingTop: '30px', justifyContent: 'space-between', alignItems: 'center' }}>
            <PlayerBox>
                <h1>{lyrics.question}</h1>
            </PlayerBox>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', rowGap: '50px' }}>
                <div>Countdown: {counter}</div>
                <LyricBox>
                    <Lyrics></Lyrics>
                </LyricBox>
                <AnswerField></AnswerField>
            </Box>
            <PlayerBox>
                <PeopleBox>
                    <b>player1</b>
                    <br></br>
                    <em>baybeh baybeh baybeh aw</em>
                    <br></br>
                    <Box>Score: 1</Box>
                </PeopleBox>
                <PeopleBox>
                    <b>player2</b>
                    <br></br>
                    <em>baybeh baybeh baybeh aw</em>
                    <br></br>
                    <Box>Score: 1</Box>
                </PeopleBox>
            </PlayerBox>
            {/* <Button size='large' variant="contained" color="primary" onClick={() => {nav(`/final/${code}`)}}>Home</Button> */}
        </Box>
    )
}