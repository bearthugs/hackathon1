import * as React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
// import { useTheme } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import PeopleIcon from '@mui/icons-material/People';
export const RoomButton = (props) => {
    const { display, location, isCreate } = props
    const nav = useNavigate()
    // const theme = useTheme()
    return (
        <Button startIcon={isCreate?<CreateIcon sx={{ width: '100px', height: '100px' }}/>:<PeopleIcon sx={{ width: '100px', height: '100px' }}/>} variant="outlined" sx={{ width: '70%', height: '250px', fontSize:'4em', borderWidth: '5px'}} onClick={() => nav(location)}>
            {display}
        </Button>
    )
}