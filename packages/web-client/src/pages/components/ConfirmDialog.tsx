import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

export interface ConfirmDialogProps {
  title: string;
  text: string;
  open: boolean;
  onClose: (isConfirmed: boolean) => void;
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { title, text, open, onClose } = props;

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{text}</DialogContent>
      <DialogActions>
        <Button variant="outlined" startIcon={<CancelIcon />} onClick={() => onClose(false)}>
          Cancel
        </Button>
        <Button
          autoFocus
          variant="contained"
          startIcon={<CheckIcon />}
          onClick={() => onClose(true)}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
