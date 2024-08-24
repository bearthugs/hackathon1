import * as React from 'react'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { FormBox, LabelInput, InputBox } from '../components/SettingForm';
export const Join = () => {
    const nav = useNavigate()
    const theme = useTheme()
    return (
        <Box>
            <FormBox theme={theme}>
                <LabelInput>Room Code</LabelInput>
                <InputBox name = 'code' placeholder={'Room Code'}>
                </InputBox>
            </FormBox>
        </Box>
    )
}   