import React from "react";
import { Box, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

export const PersonCard = (props) => {
    const { name, score, answer } = props
    return (
        <Box sx={{ borderRadius: '5px', display: 'flex', flexDirection: 'row', border: '1px solid', justifyContent:'space-evenly', padding: '15px', width: '300px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent:'space-between', alignContent: 'center', alignItems: 'center'}}>
                    <Typography variant="h5">{score}</Typography>
                    <PersonIcon sx={{ width: '40px', height: '40px'}}/>
                </Box>
                
                <Typography variant="h6">{name}</Typography>
            </Box>
            <Box sx={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', textAlign:'center'}}>
                <Typography variant="h6">{answer}</Typography>
                
            </Box>
        </Box>
    )
}