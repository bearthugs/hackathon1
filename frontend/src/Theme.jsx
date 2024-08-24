// import * as React from 'react'
import { createTheme } from '@mui/material/styles'

export const Theme = (mode) => createTheme({
  palette: {
    mode: mode,
    primary: {
      main: mode === 'dark' ? '#3DA35D' : '#3DA35D'
    },
    background: {
      default: mode === 'dark' ? '#1F3824' : '#E8FCCF'
    },
    secondary: {
      main: mode === 'dark' ? '#3C7247' : '#2F8044'
    },
    text: {
      primary: mode === 'dark' ? '#D9FFCC' : '#0E2015'
    }
  }
})