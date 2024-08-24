import { Switch } from '@mui/material'
import * as React from 'react'

export function Toggle({ darkMode, handleThemeChange }) {
  return (
    <Switch sx={{ color: 'white' }} checked={darkMode} onChange={handleThemeChange}/>
  )
}

