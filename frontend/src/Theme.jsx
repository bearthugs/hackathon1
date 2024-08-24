// import * as React from 'react'
import { createTheme } from '@mui/material/styles'

export const Theme = (mode) => createTheme({
  palette: {
    mode: mode,
    primary: {
      main: mode === 'dark' ? '#F6B7CC' : '#EB6E98'
    },
    background: {
      default: mode === 'dark' ? '#33272B' : '#FEF0F5'
    },
    secondary: {
      main: '#FC8EAC'
    },
  }
})