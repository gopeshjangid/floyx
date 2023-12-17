import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogProps as MUIDialogProps } from '@mui/material/Dialog';

interface CustomDialogProps {
  title: string;
  content: React.ReactNode;
  actions: React.ReactNode;
}

const CustomDialog: React.FC<CustomDialogProps & MUIDialogProps> = ({
  title,
  content = '',
  actions,
  ...dialogProps
}) => {
  return (
    <Dialog {...dialogProps}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
