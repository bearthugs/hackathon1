import * as React from 'react'
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { socket } from '../socket';
import { PlayerBox } from '../components/PlayerBox';
import { startGame } from '../function';

export const Game = () => {
    let url = window.location.href;
    url = url.split('/');
    const code = url[4];

    return (
        <Box sx={{ display: 'flex', padding:'30px'}}>
            <PlayerBox>
                <h1>hi</h1>
            </PlayerBox>
        </Box>
    )
}