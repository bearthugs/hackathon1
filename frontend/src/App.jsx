import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Wrapper } from './Wrapper';
import { Toggle } from './components/Toggle';
import { HeaderBox } from './components/HeaderBox';
import { Theme } from './Theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Box, Button } from '@mui/material';
import { ConditionalButton } from './components/ConditionalButton';
import { socket } from './socket'; // Import the socket instance
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    const theme = Theme(darkMode ? 'dark' : 'light');
    
    const colorMode = React.useMemo(
      () => ({
        toggleColorMode: () => {
          setDarkMode((prevMode) => (prevMode === false ? true : false));
        },
      }),
      [],
    );
  // useEffect(() => {
  //   fetch('http://127.0.0.1:5000/test')
  //     .then(response => response.json())
  //     .then(json => setData(JSON.stringify(json)))
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);
  // console.log(darkMode)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <BrowserRouter>
    <HeaderBox>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', columnGap: '10px' }}>
          <SportsMmaIcon sx={{ width: '40px', height:'40px'}}/>
            <h1 style={{ display: 'inline'}}>Spoti<em>FIGHT</em></h1>
            
          </Box>
            
            {/* <pre>{data}</pre> */}
            <Box>
              {/* <Toggle darkMode={darkMode} handleThemeChange={handleThemeChange}/> */}
              <IconButton sx={{ ml: 2, height:'25px', width: '25px' }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <ConditionalButton variant='contained'>Back</ConditionalButton>
            </Box>
      </HeaderBox>
    < Wrapper/>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;