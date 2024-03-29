import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  Popover,
  IconButton,
  Paper,
  Stack,
  Divider,
  useTheme,
  Radio,
  RadioGroup,
  CircularProgress
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MoreHorizOutlined } from '@mui/icons-material';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import TextareaAutosize from '@/components/CustomTextArea';
import {
  useBlockUserMutation,
} from '@/lib/redux/slices/profile';
import {
  useReportPostMutation
} from "@/lib/redux/slices/posts/index"
import { useToast } from '@/components/Toast/useToast';
import DeleteModal from '../../app/(secured)/inbox/components/delete-modal';
import { useRouter } from 'next/navigation';
import { allRoutes } from '@/constants/allRoutes';
import MenuItem from '@mui/material/MenuItem';


interface UserActionModalProps {
  onSuccess: (status: string) => void;
  username: string;
  isDeleteUser?: boolean;
  handleDelete?: () => void;
  deleteLoading?: boolean;
  options?: [string, string];
  contentId?: string;
  handleCloseSplit?: any;
}

const BlockUserDisclaimer = () => {
  return (
    <Box>
      <Typography variant="h6" textAlign="center">
        If you block this user you will no be able to :
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Stack gap={1}>
        <Typography variant="body2" component={'li'}>
          View their profile, posts, articles and events
        </Typography>
        <Typography variant="body2" component={'li'}>
          You will both unfollow each other
        </Typography>
        <Typography variant="body2" component={'li'}>
          To see the user content you have to follow him again after unblocking.
        </Typography>
        <Typography variant="body2" component={'li'}>
          Do you really wish to block this user?
        </Typography>
      </Stack>
    </Box>
  );
};

const reportChecks = [
  'Their Materials are abusive or hateful',
  "It's suspicious or spam",
  'It appears their account is hacked',
  "They're pretending to be me or someone else",
  'Their profile info and/or images includes abusive or hateful content',
];
const ReportUserDisclaimer: React.FC<{
  handleReportChange: (e: any) => void;
}> = ({ handleReportChange }) => {
  const [radioValue, setRadioValue] = useState('');
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.stopPropagation()
    const value = event.target.value; // No need for optional chaining here
    const name = event.target.name;

    if (name === 'check' && radioValue) {
      setRadioValue('');
    } else if (event.target.name === 'check') {
      setRadioValue(value);
    }
    handleReportChange(value);
  };
  return (
    <Box>
      <Typography variant="h6" textAlign="center">
        Help us understand the problem Why do you want to report this Post?
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Stack gap={1}>
        <RadioGroup
          defaultValue={radioValue}
          defaultChecked={!!radioValue}
          onChange={handleChange}
          name="check"
        >
          {reportChecks.map((check, index) => (
            <FormControlLabel
              key={'label-' + index}
              value={check}
              control={<Radio />}
              label={check}
            />
          ))}
        </RadioGroup>

        <Typography variant="subtitle2">
          If the user violates the Floyx rules in other ways, Please write to us
          below :
        </Typography>

        <TextareaAutosize onChange={handleChange} placeholder="Type here..." />
      </Stack>
    </Box>
  );
};

// The component itself
const BlockReportPostFeed: React.FC<UserActionModalProps> = ({
  username,
  isDeleteUser,
  onSuccess,
  handleDelete,
  deleteLoading,
  options,
  contentId,
  handleCloseSplit
}) => {
  const toast = useToast();
  const { palette } = useTheme();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [deleteModal, setDeleteModal] = useState(false);

  const onDelete = () => {
    setDeleteModal(true);
  };

  const [blockUser, { isLoading:blockUserLoading, isSuccess: isBlocked }] = useBlockUserMutation();
  const [reportPost, { isLoading:reportPostLoading, isSuccess: isReported }] = useReportPostMutation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (isBlocked || isReported) {
      toast.success(
        isBlocked
          ? 'The user has been blocked !'
          : 'The post has been reported!'
      );
      handleCloseSplit(false)
    }
  }, [isBlocked, isReported]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? undefined : undefined;
  const [reportReason, setReportReason] = useState('');
  const [modalType, setModalType] = useState('');

  const handleReportChange = (event: string) => {
    setReportReason(event);
  };

  const handleReportSubmit = async () => {
    try {
      await reportPost({ contentId: contentId, Reason: reportReason });
      onSuccess('REPORT'); // Close the modal after successful submission
      handleClose();
      setModalType('');
    } catch (error) {
      handleCloseSplit(false)
      toast.error('Error occured in reporting the post');
      console.error('Error reporting the post:', error);
    }
  };

  const handleBlockUser = async () => {
    try {
      await blockUser({ username });
      onSuccess('BLOCKED');
      handleClose();
      setModalType('');
      router.replace(allRoutes.home);
    } catch (error) {
      handleCloseSplit(false)
      toast.error('Error occured in blocking the user');
      console.error('Error blocking the user:', error);
    }
  };

  const closeDialog = () => {
    setModalType('');
  };

  const buttonSx = {
    fontSize: '16px',
    color: palette.mode === 'dark' ? '#fff' : '#000',
    fontWeight: '400',
    fontFamily: "'__Poppins_6fcd13', '__Poppins_Fallback_6fcd13', 'Helvetica Neue', Arial, sans-serif",
    textTransform: 'capitalize',
  };

  const contentStyle = {
    marginLeft:'7px'
  }

  return (
    <>
      {deleteModal && (
        <DeleteModal
          onClose={() => setDeleteModal(false)}
          onConfirm={handleDelete!}
          isLoading={deleteLoading}
        />
      )}

      <Box position="relative" sx={{paddingLeft:'0px'}}>
        {/* <IconButton onClick={handleClick}>
          <MoreHorizOutlined color="primary" />
        </IconButton> */}
        {/* <Popover
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
          sx={{ padding: 1}}
        > */}
          <Paper>
            <Stack>
            <MenuItem>
              <Button
                onClick={() => setModalType('block')}
                color="inherit"
                sx={{ ...buttonSx }}
                startIcon={<BlockOutlinedIcon />}
              >
                {' '}
                {/* Block User */}
                <span style={contentStyle}>{options?.length ? options[0] : 'Block User'}</span>
              </Button>
              </MenuItem>
              <MenuItem>
              <Button
                onClick={() => setModalType('report')}
                color="inherit"
                sx={{ ...buttonSx }}
                startIcon={<OutlinedFlagOutlinedIcon />}
              >
                {/* Report User */}
                <span style={contentStyle}>{options?.length ? options[1] : 'Report User'}</span>
              </Button>
              </MenuItem>

              {isDeleteUser && (
                <Button
                  onClick={() => onDelete()}
                  color="inherit"
                  sx={{ fontSize: '12px' }}
                  startIcon={<DeleteOutlinedIcon />}
                >
                  Delete Chat
                </Button>
              )}
            </Stack>
          </Paper>
        {/* </Popover> */}
      </Box>

      <Dialog
        open={!!modalType}
        onClose={closeDialog}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{ sx: { background: palette.background.default } }}
        className='specific_item'
      >
        <DialogTitle id="responsive-dialog-title">
          {modalType === 'report' ? (
            <Stack direction={'row'} justifyContent="center" gap={1}>
              <OutlinedFlagOutlinedIcon />{' '}
              <Typography variant="h6">Report Issue</Typography>
            </Stack>
          ) : (
            <Stack direction={'row'} justifyContent="center" gap={1}>
              <BlockOutlinedIcon />{' '}
              <Typography variant="h6">Block User</Typography>
            </Stack>
          )}
        </DialogTitle>
        <DialogContent>
          {modalType === 'block' ? (
            <BlockUserDisclaimer />
          ) : (
            <ReportUserDisclaimer handleReportChange={handleReportChange} />
          )}
        </DialogContent>
        <DialogActions>
          {modalType == 'report' ? (
            <>
              {reportPostLoading && (
                <Box sx={{ position: 'absolute', zIndex: 999, right: '20%' }}>
                  <CircularProgress thickness={2} size={30} />
                </Box>
              )} 
              <Button
                autoFocus
                variant="contained"
                onClick={handleReportSubmit}
                disabled={!reportReason}
              >
                Report
              </Button>
              <Button onClick={closeDialog} variant="text">
                Close
              </Button>
            </>
          ) : (
            <>
              {blockUserLoading && (
                  <Box sx={{ position: 'absolute', zIndex: 999, right: '19%' }}>
                    <CircularProgress thickness={2} size={30} />
                  </Box>
                )}
              <Button variant="contained" autoFocus onClick={handleBlockUser}>
                Yes
              </Button>
              <Button variant="text" onClick={closeDialog} autoFocus>
                No
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};


export default BlockReportPostFeed;
