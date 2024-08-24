// import * as React from 'react'
import { createTheme } from '@mui/material/styles'

export const Theme = (mode) => createTheme({
  palette: {
    mode: mode,
    primary: {
      main: mode === 'dark' ? '#F6B7CC' : '#3DA35D'
    },
    background: {
      default: mode === 'dark' ? '#33272B' : '#E8FCCF'
    },
    secondary: {
      main: mode === 'dark' ? '#33272B' : '#2B733F'
    },
  }
})