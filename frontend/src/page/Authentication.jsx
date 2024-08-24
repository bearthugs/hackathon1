import * as React from 'react'
import Button from '@mui/material/Button';
import { getAuthentication } from '../function'
import { useNavigate } from 'react-router-dom';


const handleClick = async (nav) => {
    const response = await getAuthentication()
    if (response.status === 200) {
        nav('/home')
    }
}

export const Authentication = () => {
    const nav = useNavigate()
    return (
        <>
            <Button variant='contained' size='large' onClick={() => handleClick(nav)}>Click Me</Button>
        </>
    )
}