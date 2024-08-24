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

    const handleClick = async (nav, code) => {
        console.log(code)
        const response = await checkRoomId(code)
        if (response.status === 200) {
            console.log(code)
            // nav('/room/' + code)
        } else {
            console.log(response.status)
        }
    }

    return (
        <Box>
            <FormBox theme={theme}>
                <LabelInput>Room Code</LabelInput>
                <InputBox name='code' placeholder={'Room Code'} value={code} onChange={(e) => setCode(e.target.value)} required>
                </InputBox>
                
            </FormBox>

            <Button variant='contained' onClick={() => {
                    handleClick(nav, code)
                }}>Start Game</Button>
        </Box>
    )
}   
