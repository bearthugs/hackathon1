import * as React from 'react'
import Button from '@mui/material/Button';
import { getAuthentication } from '../function'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ReactComponent as MyIcon } from '../spotify-logo.svg';

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
        <Box sx={{ padding: '100px', display: 'flex', justifyContent: 'center', height: '90vh', marginTop: '15vh'}} >
            <Button startIcon={<MyIcon />} variant='contained' size='large' sx={{ width: '50vw', height: '150px', fontSize:'2em', borderWidth: '5px' }} onClick={() => handleClick(nav)}>Log in with Spotify!</Button>
        </Box>
    )
}