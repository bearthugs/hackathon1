import * as React from 'react'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { FormBox, LabelInput, InputBox } from '../components/SettingForm';
import Button from '@mui/material/Button';
import { checkRoomId } from '../function'
export const Join = () => {
    const nav = useNavigate()
    const theme = useTheme()
    const [code, setCode] = React.useState('');

    const handleInputChange = (e) => {
        setCode(e.target.value);
    };

    const handleClick = async (nav, code) => {
        console.log(code)
        const response = await checkRoomId(code)
        if (response.status === 'success') {
            console.log(code)
            // nav('/room/' + code)
        }
    }

    return (
        <Box>
            <FormBox theme={theme}>
                <LabelInput>Room Code</LabelInput>
                <InputBox name='code' placeholder={'Room Code'} value={code} onChange={handleInputChange} required>
                </InputBox>
                <Button variant='contained' onClick={() => {
                    handleClick(code)
                }} type="submit">Start Game</Button>
            </FormBox>

            
        </Box>
    )
}   