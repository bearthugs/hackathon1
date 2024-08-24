import * as React from 'react'
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';

export const ConditionalButton = () => {
    const nav = useNavigate()
    // const location = useLocation();
    let url = window.location.href
    url = url.split('/')
    // Check if the current URL matches the specified URL path
    // const shouldShowButton = url.includes('authenticate');
    if (url.includes('authentication') || url.includes('home')) return null;

    return (
        <Button variant='contained' sx={{ ml: '20px'}} onClick={() => nav('/home')}>Back</Button>
    )
}