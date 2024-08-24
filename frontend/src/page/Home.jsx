import * as React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';


export const Home = () => {
    const nav = useNavigate()
    return (
        <Box>
             <Button variant='contained' size='large' sx={{ margin: '30px' }}
        onClick={() => {
            nav('/setting')
        }}>Single</Button>
        <Button variant='contained' size='large' sx={{ margin: '30px' }}
        onClick={() => {
            nav('/setting')
        }}>Multi</Button>
        </Box>
    )
}