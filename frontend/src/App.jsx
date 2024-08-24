import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Wrapper } from './Wrapper';
import { Toggle } from './components/Toggle';
import { HeaderBox } from './components/HeaderBox';
import { Theme } from './Theme';
import { ThemeProvider, CssBaseline } from '@mui/material';


function App () {
  const [darkMode, setDarkMode] = React.useState(false)

  const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/test')
      .then(response => response.json())
      .then(json => setData(JSON.stringify(json)))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleThemeChange = () => {
    setDarkMode(!darkMode)
  }

  const theme = Theme(darkMode ? 'dark' : 'light')
  // console.log(darkMode)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <HeaderBox>
            <h1>Spoti<em>FIGHT</em></h1>
            <pre>{data}</pre>
            <Toggle darkMode={darkMode} handleThemeChange={handleThemeChange}/>
        </HeaderBox>
    <BrowserRouter>
    < Wrapper/>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
