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
  useAddReportUserMutation,
  useBlockUserMutation,
} from '@/lib/redux/slices/profile';
import { useToast } from '@/components/Toast/useToast';
import DeleteModal from '../../inbox/components/delete-modal';
import { useRouter } from 'next/navigation';
import { allRoutes } from '@/constants/allRoutes';

interface UserActionModalProps {
  onSuccess: (status: string) => void;
  username: string;
  isDeleteUser?: boolean;
  handleDelete?: () => void;
  deleteLoading?: boolean;
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
        Help us understand the problem Why do you want to report this User?
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
const BlockReportUser: React.FC<UserActionModalProps> = ({
  username,
  isDeleteUser,
  onSuccess,
  handleDelete,
  deleteLoading,
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

  const [blockUser, { isSuccess: isBlocked }] = useBlockUserMutation();
  const [reportUser, { isSuccess: isReported }] = useAddReportUserMutation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (isBlocked || isReported) {
      toast.success(
        isBlocked
          ? 'The user has been blocked !'
          : 'The user has been reported!'
      );
    }
  }, [isBlocked, isReported]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [reportReason, setReportReason] = useState('');
  const [modalType, setModalType] = useState('');

  const handleReportChange = (event: string) => {
    setReportReason(event);
  };

  const handleReportSubmit = async () => {
    try {
      await reportUser({ Username: username, Reason: reportReason });
      onSuccess('REPORT'); // Close the modal after successful submission
      handleClose();
      setModalType('');
    } catch (error) {
      toast.error('Error occured in reporting the user');
      console.error('Error reporting the user:', error);
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
      toast.error('Error occured in blocking the user');
      console.error('Error blocking the user:', error);
    }
  };

  const closeDialog = () => {
    setModalType('');
  };

  return (
    <>
      {deleteModal && (
        <DeleteModal
          onClose={() => setDeleteModal(false)}
          onConfirm={handleDelete!}
          isLoading={deleteLoading}
        />
      )}

      <Box position="relative">
        <IconButton onClick={handleClick}>
          <MoreHorizOutlined color="primary" />
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
          sx={{ padding: 1, opacity: 0.4 }}
        >
          <Paper>
            <Stack>
              <Button
                onClick={() => setModalType('block')}
                color="inherit"
                sx={{ fontSize: '12px' }}
                startIcon={<BlockOutlinedIcon />}
              >
                {' '}
                Block User
              </Button>
              <Button
                onClick={() => setModalType('report')}
                color="inherit"
                sx={{ fontSize: '12px' }}
                startIcon={<OutlinedFlagOutlinedIcon />}
              >
                Report User
              </Button>

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
        </Popover>
      </Box>

      <Dialog
        open={!!modalType}
        onClose={closeDialog}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{ sx: { background: palette.background.default } }}
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

export default BlockReportUser;
