// import * as React from 'react'
import { createTheme } from '@mui/material/styles'

export const Theme = (mode) => createTheme({
  palette: {
    mode: mode,
    primary: {
      main: mode === 'dark' ? '#90caf9' : '#1976d2'
    },
    background: {
      default: mode === 'dark' ? '#33272B' : '#FEF0F5'
    },
    secondary: {
      main: '#ffffff'
    }
  }
})