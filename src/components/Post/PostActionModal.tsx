import { useDeletePostMutation } from '@/lib/redux';
import { DeleteOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useToast } from '../Toast/useToast';
import { useTranslation } from 'react-i18next';

function PostActionModal({
  action,
  open,
  setOpen,
  postId,
  onDeleted = () => {},
}: {
  action: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
  onDeleted?: () => void;
}) {
  const { t } = useTranslation();
  const toast = useToast();
  const [deletePost, { isLoading: isDeleting, isSuccess }] =
    useDeletePostMutation();

  const performAction = async () => {
    if (action === t('Home.postSection.options.deletePost')) {
      await deletePost(postId);
      toast.success(t('Home.postSection.toastMsg.msg1'));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onDeleted();
      setOpen(false);
    }
  }, [isSuccess, setOpen]);

  return (
    <Modal
      keepMounted
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            component="h2"
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <DeleteOutline /> {action}
          </Typography>
          <Typography
            translate="no"
            id="keep-mounted-modal-description"
            sx={{ margin: '32px 0' }}
          >
            {action === t('Home.postSection.options.deletePost') &&
              t('Home.postSection.toastMsg.msg2')}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'end' }}>
          <Button
            variant="contained"
            color="error"
            sx={{
              marginRight: 3,
              padding: '12px 29px',
              borderRadius: '10px',
            }}
            disabled={isDeleting}
            onClick={performAction}
          >
            {!isDeleting && action}
            {isDeleting && <CircularProgress color="primary" size={25} />}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(false)}
          >
            {t('comp.comment.deleteCancel')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default React.memo(PostActionModal);
