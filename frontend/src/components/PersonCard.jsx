import React from "react";
import { Box, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

export const PersonCard = (props) => {
    const { name, score } = props
    return (
        <Box sx={{ borderRadius: '5px', display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <PersonIcon sx={{ width: '30px', heigh: '30px'}}></PersonIcon>
                <Typography variant="h4">{name}</Typography>
            </Box>
            <Typography variant="h1">{score}</Typography>
        </Box>
    )
}