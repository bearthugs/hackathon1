import React from "react";
import { Box, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

export const PersonCard = (props) => {
    const { name, score } = props
    return (
        <Box sx={{ borderRadius: '5px', display: 'flex', flexDirection: 'row', border: '1px solid black' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <PersonIcon sx={{ width: '70px', heigh: '70px'}}></PersonIcon>
                <Typography variant="h4">{name}</Typography>
            </Box>
            <Typography variant="h1">{score}</Typography>
        </Box>
    )
}