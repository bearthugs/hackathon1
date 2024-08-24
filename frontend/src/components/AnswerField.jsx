import React from 'react';
import { TextField } from '@mui/material';
import { socket } from '../socket';
import Cookies from "js-cookie";

export const AnswerField = (props) => {
    const { code } = props
    const [answer, setAnswer] = React.useState('');
    const sessionid = Cookies.get('session_id');
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            // some socket stuff here
            console.log(code)
            socket.emit('input', { 'room_id': code, 'session_id': sessionid, 'message': answer })
            // console.log(answer)
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