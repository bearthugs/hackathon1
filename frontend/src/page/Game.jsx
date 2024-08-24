import * as React from 'react'
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { socket } from '../socket';
import { PlayerBox } from '../components/PlayerBox';
import { startGame } from '../function';
import { LyricBox } from '../components/LyricBox';
import { AnswerField } from '../components/AnswerField';

export const Game = () => {
    let url = window.location.href;
    url = url.split('/');
    const code = url[4];

    return (
        <Box sx={{ display: 'flex', padding:'30px', justifyContent: 'space-between' }}>
            <PlayerBox>
                <h1>Box 1</h1>
            </PlayerBox>
            <Box sx={{ display: 'flex', padding:'30px', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', rowGap: '50px' }}>
                <LyricBox></LyricBox>
                <AnswerField></AnswerField>
            </Box>
            <PlayerBox>
                <h1>Box 2</h1>
            </PlayerBox>
        </Box>
    )
}