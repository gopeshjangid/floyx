'use client';
import HorizontalDottedIcon from '@/images/image/horizontalDottedIcon';

import {
  Box,
  IconButton,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';


 function DottedButton({options, handleOption}: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    value: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
      handleOption(value);
      setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} sx={{ opacity: 1 }}>
        <HorizontalDottedIcon />
      </IconButton>
      {open && <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ padding: 1 }}
      >
        <MenuList id="split-button-menu" autoFocusItem>
          {options.map((option:any, index: number) => (
            <MenuItem
              key={index}
              onClick={event => handleMenuItemClick(event, option.value)}
            >
              <Box sx={{ display: 'flex' }}>
                {option?.icon && (
                  <Typography sx={{ marginRight: '5px' }}>
                    {option?.icon}
                  </Typography>
                )}
                <Typography>{option?.name}</Typography>
              </Box>
            </MenuItem>
          ))}
        </MenuList>
      </Popover> }
    </>
  );
}

export default React.memo(DottedButton);
