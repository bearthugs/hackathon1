import React from "react";
import { Box, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

export const PersonCard = (props) => {
    const { name, score } = props
    return (
        <Box sx={{ borderRadius: '5px', display: 'flex', flexDirection: 'row', border: '1px solid black', justifyContent:'space-evenly' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <PersonIcon sx={{ width: '70px', height: '70px'}}/>
                <Typography variant="h5">{name}</Typography>
            </Box>
            <Typography variant="h2">{score}</Typography>
        </Box>
    )
}