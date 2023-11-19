import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

interface IDeleteModal {
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const DeleteModal = ({ onClose, onConfirm, isLoading }: IDeleteModal) => {
  return (
    <Dialog open={true} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Delete conversation</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Are you sure you want to delete this conversation?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={isLoading}>
          Cancel
        </Button>

        <Button onClick={onConfirm} disabled={isLoading}>
          {isLoading ? <CircularProgress size={16} /> : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
