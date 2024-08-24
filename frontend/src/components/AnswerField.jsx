import React from 'react';
import { TextField } from '@mui/material';
import { socket } from '../socket';
import Cookies from "js-cookie";

export const AnswerField = (props) => {
    const { code, nav, setLyrics, setUsers, users } = props
    const [answer, setAnswer] = React.useState('');
    const sessionid = Cookies.get('session_id');
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            // some socket stuff here
            console.log(code)
            socket.emit('input', { 'room_id': code, 'session_id': sessionid, 'message': answer })


            socket.on('gameOver', async (question) => {
              if (typeof question === 'object') {
                nav(`/final/${code}`)
              }
            })

           socket.on('nextQuestion', async (question) => {
            if (typeof question === 'object') {
              let usersNew = []
              for (const user in users) {
                if (user.name === question.username) {
                  usersNew.push({name:user.name, score:question.score, answer:answer})
                } else {
                  usersNew.push(user)
                }
              }
              setUsers(usersNew)
              setLyrics(question.next)
            }
          })

          socket.on('wrongAnswer', async (question) => {
            if (typeof question === 'object') {
              
            }
          })
        }
    }
    return (
      <TextField
        label="Your Answer"
        variant="outlined"
        InputProps={{
          sx: {
            height: '100%',
            textAlign: 'center', 
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
          }
        }}
        sx={{
          height: '20vh',
          width: '30vw',
          '& .MuiInputBase-root': {
            height: '100%',
          },
          '& .MuiInputLabel-root': {
            fontSize: '1.2rem', // Adjusts the label text size if necessary
          }
        }}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyUp={(e) => handleKeyPress(e)}
        // onKeyPress={handleKeyPress}={}
      />
    );
}