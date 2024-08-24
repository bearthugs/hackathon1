import * as React from 'react'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { FormBox, LabelInput, InputBox } from '../components/SettingForm';
import Button from '@mui/material/Button';
import { checkRoomId } from '../function'
import { socket } from '../socket';
import { DialogDelete } from '../components/DialogError';

export const Join = () => {
    const nav = useNavigate()
    const theme = useTheme()
    const [code, setCode] = React.useState('');
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [error, setError] = React.useState('Room Full');


    const handleClick = async (nav, code) => {
        try {
            const response = await checkRoomId(code)
            socket.connect();
            socket.emit('newUser', 'has joined');
            console.log('hi')
            nav(`/room/${code}`)
        } catch (error) {
            setError(error.status === 404 ? 'Incorrect Code' : 'Room Full')
            console.log(error.message, error.status)
            setDeleteModal(true)
        }
    }
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            <FormBox theme={theme}>
                <LabelInput>Room Code</LabelInput>
                <InputBox name='code' placeholder={'Room Code'} value={code} onChange={(e) => setCode(e.target.value)} required>
                </InputBox>
            </FormBox>
            <DialogDelete deleteShow={deleteModal} deleteSet={setDeleteModal} message={error}></DialogDelete>
            <Button sx={{ width: '40%'}} variant='contained' onClick={() => {
                    handleClick(nav, code)
                }}>Start Game</Button>
        </Box>
    )
}   
