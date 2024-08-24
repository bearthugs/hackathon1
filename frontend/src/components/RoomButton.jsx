import * as React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
// import { useTheme } from '@mui/material';

export const RoomButton = (props) => {
    const { display, location } = props
    const nav = useNavigate()
    // const theme = useTheme()
    return (
        <Button variant="outlined" sx={{ width: '70%', height: '250px', fontSize:'4em', borderWidth: '5px'}} onClick={() => nav(location)}>
            {display}
        </Button>
    )
}