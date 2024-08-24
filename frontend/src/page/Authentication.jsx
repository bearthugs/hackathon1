import * as React from 'react'
import Button from '@mui/material/Button';
import { getAuthentication } from '../function'
import { Link, useNavigate } from 'react-router-dom';


const handleClick = (nav) => {
    const response = getAuthentication()
    console.log(response)
}

export const Authentication = () => {
    const nav = useNavigate()
    return (
        <>
            <Button variant='Link' sx={{ backgroundColor: "green" }} onClick={() => handleClick()}>Click Me</Button>
            <Button variant='contained' size='large' sx={{ margin: '30px' }}
        onClick={() => {
            nav('/home')
        }}>Home</Button>
        </>
    )
}