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
import { useDeleteCommentMutation } from "@/lib/redux/slices/comments";

export default function DeleteComment({
  open,
  setOpen,
  commentId,
  commentType,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  commentId: string;
  commentType: string;
}) {
  const toast = useToast();
  const [deletComment, { isLoading: isDeleting }] =
    useDeleteCommentMutation();

  const performAction = async () => {
    const post = 'post';
    await deletComment({commentId: commentId, type: (commentType.toLowerCase()).includes(post)});
    setOpen(false);
    toast.success('Comment is deleted successfully.');
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
            variant="h6"
            component="h2"
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <DeleteOutline /> Delete Comment
          </Typography>
          <Typography
            id="keep-mounted-modal-description"
            sx={{ margin: '32px 0' }}
          >
           
              Are you sure you want to delete this comment?
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
            {!isDeleting && 'Delete Comment'}
            {isDeleting && <CircularProgress color="primary" size={25} />}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
