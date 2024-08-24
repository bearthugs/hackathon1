import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Heading } from '../components/Heading';
import { socket } from '../socket';

export const Room = () => {
    let url = window.location.href;
    url = url.split('/');
    const code = url[4];

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
        if (socket.connected) {
            socket.emit('test', 'yuhhhhhhhh');
            console.log('Test event emitted');
        } else {
            console.log('Socket not connected');
        }
    };

    return (
        <Box>
            <Heading theme='3em'>Your Room Code is:</Heading>
            <Heading sx={{marginLeft:'30%'}} theme='5em'>{code}</Heading>
            <>Waiting for players to join...</>
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
                Emit Test Event
            </Button>
        </Box>
    );
};