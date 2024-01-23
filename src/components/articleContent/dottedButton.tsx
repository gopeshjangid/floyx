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
import { useState } from 'react';


export default function DottedButton({options, handleOption, setOpen}: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
    optionName: string,
  ) => {
    event.stopPropagation();
    const options = ['Report Article', 'Block user', 'Report user'];
    let optionsIndex = options.indexOf(optionName);
    if (optionsIndex !== -1) {
      handleOption(optionsIndex);
      setAnchorEl(null);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <IconButton onClick={handleClick} sx={{ opacity: 1 }}>
        <HorizontalDottedIcon />
      </IconButton>
      <Popover
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
              //   selected={index}
              onClick={event => handleMenuItemClick(event, index, option?.name)}
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
      </Popover>
    </>
  );
}
