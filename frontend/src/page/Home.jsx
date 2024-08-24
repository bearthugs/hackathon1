import * as React from 'react'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { RoomButton } from '../components/RoomButton';

export const Home = () => {
    const nav = useNavigate()
    return (
        <Box sx={{ padding: '30px', display: 'flex', justifyContent: 'center', height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '100%', justifyContent: 'center', alignItems:'center'}}>
                <RoomButton display='Create Room' location='/create'></RoomButton>
                <RoomButton display='Join Room' location='/join'></RoomButton>
            </Box>
        </Box>
    )
}