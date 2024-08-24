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

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    const theme = Theme(darkMode ? 'dark' : 'light');

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
            <h1>Spoti<em>FIGHT</em></h1>
            {/* <pre>{data}</pre> */}
            <Box>
              <Toggle darkMode={darkMode} handleThemeChange={handleThemeChange}/>
              <ConditionalButton variant='contained'>Back</ConditionalButton>
            </Box>
      </HeaderBox>
    < Wrapper/>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;