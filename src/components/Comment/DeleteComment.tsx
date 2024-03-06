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
import { useDeleteCommentMutation } from '@/lib/redux/slices/comments';
import { useTranslation } from 'react-i18next';
export default function DeleteComment({
  open,
  setOpen,
  commentId,
  commentType,
  onAction,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  commentId: string;
  commentType: string;
  onAction: (comment) => void;
}) {
  const { t } = useTranslation();
  const toast = useToast();
  const [deletComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const performAction = async () => {
    const post = 'post';
    await deletComment({
      commentId: commentId,
      type: commentType.toLowerCase().includes(post),
    });
    setOpen(false);
    onAction({ id: commentId, isDeleted: true });
    toast.success(t('comp.comment.deleteMsg'));
  };

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
            translate="no"
            variant="h6"
            component="h2"
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <DeleteOutline /> {t('comp.comment.deleteComment')}
          </Typography>
          <Typography
            translate="no"
            id="keep-mounted-modal-description"
            sx={{ margin: '32px 0' }}
          >
            {t('comp.comment.deleteWarning')}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'end' }}>
          <Button
            translate="no"
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
            {!isDeleting && t('comp.comment.deleteComment')}
            {isDeleting && <CircularProgress color="primary" size={25} />}
          </Button>
          <Button
            translate="no"
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
