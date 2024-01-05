import React, { useState } from 'react';
import { Box, IconButton, Popover, Paper, Button, Stack } from '@mui/material';
import MoreHorizOutlined from '@mui/icons-material/MoreHorizOutlined';

// Define the types for the options
type PopoverOption = {
  label: string;
  onClick: () => void;
  startIcon?: React.ReactNode;
};

interface CustomPopoverProps {
  options: PopoverOption[];
  actionOriginIcon?: React.ReactNode | React.ReactElement;
  open: boolean,
  id: string | undefined,
  handleClose: any,
  anchorEl: HTMLButtonElement | null,
}

const CustomPopover: React.FC<CustomPopoverProps> = ({
  options,
  actionOriginIcon,
  open,
  id,
  handleClose,
  anchorEl,
}) => {
  
  return (
    <Box position="relative">
      <IconButton sx={{padding: 0}}>
        {actionOriginIcon ? (
          actionOriginIcon
        ) : (
          <MoreHorizOutlined color="primary" />
        )}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          border: theme => `1px solid ${theme.palette.primary.boxBorder}`,
          padding: 1,
          borderRadius: '5px',
        }}
      >
        <Paper
          sx={{
            padding: 2,
            border: theme => `1px solid ${theme.palette.primary.boxBorder}`,
            borderRadius: '5px',
          }}
        >
          <Stack alignItems="flex-start">
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={option.onClick}
                color="inherit"
                sx={{ fontSize: '14px', fontWeight: '400' }}
                startIcon={option.startIcon}
              >
                {option.label}
              </Button>
            ))}
          </Stack>
        </Paper>
      </Popover>
    </Box>
  );
};

export default CustomPopover;
