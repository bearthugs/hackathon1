import { Switch, FormControlLabel } from '@mui/material'
import * as React from 'react'

export function Toggle({ darkMode, handleThemeChange }) {
  return (
<Switch checked={darkMode} onChange={handleThemeChange}/>
  )
}

