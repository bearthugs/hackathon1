import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Wrapper } from './Wrapper';
import { Toggle } from './components/Toggle';
import { HeaderBox } from './components/HeaderBox';
import { Theme } from './Theme';
import { ThemeProvider, CssBaseline } from '@mui/material';


function App () {
  const [darkMode, setDarkMode] = React.useState(false)

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
            <Toggle darkMode={darkMode} handleThemeChange={handleThemeChange}/>
        </HeaderBox>
    <BrowserRouter>
    < Wrapper/>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
