'use client';

import * as React from 'react';
import { ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
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
import { DeleteOutline, LinkOutlined } from '@mui/icons-material';
import LinkIcon from '@/images/image/linkIcon';

function SplitButton({
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
  const theme = useTheme();
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

  const getIcon = (option: string)=>{
    console.log(option)
     if('Delete Post'.indexOf(option) > -1){
      return <DeleteOutline sx={{color : theme.palette.primary.titleColor}} color='primary'/>
     }

     if('Direct Link'.indexOf(option) > -1){
      return <LinkOutlined sx={{color : theme.palette.primary.titleColor}} />
     }
  }

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
                <MenuList id="split-button-menu" autoFocusItem sx={{ paddingBottom: '0px' }}>
                  {options.map((option: string, index: number) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={event => handleMenuItemClick(event, index)}
                    >
                      <ListItemIcon>
                        {getIcon(option)}
                      </ListItemIcon>
                      <ListItemText sx={{color : theme.palette.primary.titleColor}}>{option}</ListItemText>
                    </MenuItem>
                  ))}
                  {['Direct Link'].every(op => options.includes(op)) && !isAuthor && <React.Suspense fallback={<Typography>Loading...</Typography>}>
                    <BlockReportPostFeed username={username} onSuccess={() => 'success'} options={['Block User', 'Report Post']} contentId={contentId} handleCloseSplit={setOpen} />
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

export default React.memo(SplitButton);
