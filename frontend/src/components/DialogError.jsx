import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

// Dialog which appears for 'Are you sure' on deleting pres
// Deletes presentation on yes
export function DialogDelete (props) {
  const { deleteShow, deleteSet, message } = props;
  return (
    <Dialog
    open={deleteShow}
    >
      <DialogTitle id="alert-dialog-title">
        { message }
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => { deleteSet(false) }}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
