import * as React from 'react'
import Box from '@mui/material/Box';
import { MyButton } from '../components/MyButton';
import { useNavigate } from 'react-router-dom';
import { InputBox, LabelInput, FormBox } from '../components/SettingForm';
import { useTheme } from '@mui/material';
import Slider from '@mui/material/Slider';
import { MySelect } from '../components/SettingForm';
import MenuItem from '@mui/material/MenuItem';
import { giveInfo } from '../function';


export const Create = () => {
    const nav = useNavigate()
    const [height, setHeight] = React.useState(5);
    const [time, setTime] = React.useState(15);
    const [diff, setDiff] = React.useState('easy');
    const [song, setSong] = React.useState(5);

    const change = async (height, time, song, diff) => {
        const response = await giveInfo(height, time, song, diff)
        console.log(response)
        nav(`/room/${response.data}`)
      }

    const handleChange = (event) => {
        setDiff(event.target.value);
      };
    const theme = useTheme()
    return (
        <Box>
       <FormBox theme={theme}>
        <LabelInput>Player Limit</LabelInput>
        <Slider
        required
        aria-label="Always visible"
        value={height}
        onChange= {(e) => setHeight(e.target.value)}
        name = 'players'
        label = 'players'
        step={1}
        color='white'
        min={2}
        max={8}
        valueLabelDisplay="on"
      />
        <LabelInput>Time Limit</LabelInput>
        <Slider
        required
        aria-label="Always visible"
        value={time}
        onChange= {(e) => setTime(e.target.value)}
        name = 'times'
        label = 'times'
        step={5}
        color='white'
        min={10}
        max={90}
        valueLabelDisplay="on"
      />
        {/* <InputBox name = 'password' placeholder={'Password'} type='password'onChange={(e) => setPassword(e.target.value)} onKeyUp={(e) => handleKeyPress(e, email, password, nav)}/> */}
        <InputBox name = 'song' placeholder={'Number of Songs'} onChange={(e) => setSong(e.target.value)}/>
          <MySelect
            labelId="fontFamily"
            id="fontFamily"
            value = {diff}
            name = 'fontFamily'
            label= 'fontFamily'
            onChange={handleChange}
            >
              <MenuItem value={'easy'}>Easy</MenuItem>
              <MenuItem value={'medium'}>Medium</MenuItem>
              <MenuItem value={'hard'}>Hard</MenuItem>
            </MySelect>
        <MyButton theme={theme} variant='outlined'
        onClick={() => {
          change(height, time, song, diff)
        }}>Create</MyButton>
      </FormBox>

      </Box>
    )
}

// room code

// easy, medium, hard
