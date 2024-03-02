'use client';

import * as React from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import BlockReportPostFeed from '@/components/Post/blockReportPostFeed';

export default function SplitButton({
  options,
  handleOptions,
  actionIcon,
  username,
  contentId,
  isAuthor
}: any) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    handleOptions(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        sx={{ '& .MuiButton-root': { border: 'none' } }}
        variant="text"
        ref={anchorRef}
        aria-label="split button"
      >
        {actionIcon && (
          <Button>{selectedIndex ? options[selectedIndex] : options[0]}</Button>
        )}
        <Button size="small" onClick={handleToggle}>
          {actionIcon ?? <MoreHorizIcon color="action" />}
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem sx={{paddingBottom: '0px'}}>
                  {options.map((option: string, index: number) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={event => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                  {['Direct Link'].every(op => options.includes(op)) && !isAuthor && <React.Suspense fallback={<Typography>Loading...</Typography>}>
                    <BlockReportPostFeed username={username} onSuccess={() => 'success'} options={['Block User', 'Report Post']} contentId={contentId} handleCloseSplit={setOpen}/>
                  </React.Suspense>}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
