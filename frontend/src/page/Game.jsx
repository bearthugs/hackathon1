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
import { PersonCard } from '../components/PersonCard';
export const Game = () => {
    let url = window.location.href;
    url = url.split('/');
    const code = url[4];
    const [counter, setCounter] = React.useState(5);
    const [lyrics, setLyrics] = React.useState('');
    const [users, setUsers] = React.useState([])
   
    const nav = useNavigate()
    // Third Attempts
    React.useEffect(() => {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        if (counter == 0) {
            setCounter(5)
            socket.emit('timeout', code) 
            socket.on('nextQuestion', async (question) => {
                console.log('HI')
                setLyrics(question.next)
            })
        }
      return () => clearInterval(timer);
    }, [counter]);

    React.useEffect(() => {
        socket.emit('startGame', code);
        socket.on('firstQuestion', async (question) => {
            console.log('HI')
            setLyrics(question.question)
            let userNew = []
            for (const user in question.users) {
                userNew.push({name: user, score: 0, answer: ''})
            }
            setUsers(userNew)
            console.log(userNew)
        })
      }, []);

    // const handleButtonClick = () => {
    //     socket.emit('startGame', code);
    //     handleStartGame(nav)
    //   };

    return (
        <Box sx={{ display: 'flex', padding:'10px', paddingTop: '30px', justifyContent: 'space-between', alignItems: 'center' }}>
            <PlayerBox>
            </PlayerBox>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', rowGap: '50px' }}>
                <div>Countdown: {counter}</div>
                <LyricBox>
                    <Lyrics lyric={lyrics}></Lyrics>
                </LyricBox>
                <AnswerField></AnswerField>
            </Box>
            <PlayerBox>
                {
                    users.map((user) => (
                        <PersonCard name={user.name} score={user.score}></PersonCard>
                    ))
                }
                <PersonCard></PersonCard>
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