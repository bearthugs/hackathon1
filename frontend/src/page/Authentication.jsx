import * as React from 'react'
import Button from '@mui/material/Button';
import { getAuthentication } from '../function'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { SpotifyIcon } from '../components/SpotifyIcon'
const handleClick = async (nav) => {
    const response = await getAuthentication()
    if (response.status === 200) {
        document.cookie = `session_id=${response.data.token};path=/;max-age=3600`;
        // console.log(response.data.token)
        nav('/home')
    }
}

export const Authentication = () => {
    const nav = useNavigate()
    return (
        <Box sx={{ padding: '100px', display: 'flex', justifyContent: 'center'}} >
            <Button variant='contained' size='large' onClick={() => handleClick(nav)}>Log in with Spotify!</Button>
        </Box>
    )
}