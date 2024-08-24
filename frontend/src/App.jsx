import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Wrapper } from './Wrapper';
import { Toggle } from './components/Toggle';
import { HeaderBox } from './components/HeaderBox';
import { Theme } from './Theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { socket } from './socket'; // Import the socket instance

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    const theme = Theme(darkMode ? 'dark' : 'light');

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HeaderBox>
                <h1>Spoti<em>FIGHT</em></h1>
                <Toggle darkMode={darkMode} handleThemeChange={handleThemeChange} />
            </HeaderBox>
            <BrowserRouter>
                <Wrapper />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;