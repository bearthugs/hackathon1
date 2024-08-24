import * as React from 'react'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { RoomButton } from '../components/RoomButton';
import { socket } from '../socket';

export const Home = () => {
    const nav = useNavigate()
    socket.emit('authenticated');
    socket.on('set_sid', (data) => {
        document.cookie = `session_id=${data};path=/;max-age=3600`;
    });
    return (
        <Box sx={{ padding: '30px', display: 'flex', justifyContent: 'center', height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '100%', justifyContent: 'center', alignItems:'center', alignContent: 'center'}}>
                <RoomButton display='Create Room' location='/create' isCreate={true}></RoomButton>
                <RoomButton display='Join Room' location='/join' isCreate={false}></RoomButton>
            </Box>
        </Box>
    )
}