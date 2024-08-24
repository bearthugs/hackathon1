import * as React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
export const Authentication = () => {
    return (
        <Box>
            <h1>Hi, Log in with Spotify</h1>
            <Button variant='Link' sx={{ backgroundColor: "green" }}>Click Me</Button>
        </Box>
    )
}