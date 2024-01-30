import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Modal,
  Typography,
} from '@mui/material';
import AddComment from '../Post/AddComment';
import Image from 'next/image';

import Post from '../Post/Post';
import {
  useCheckArticleIsSharedMutation,
  useShareArticleMutation,
  useSharePostMutation,
} from '@/lib/redux';
import { useToast } from '../Toast/useToast';
import { usePathname } from 'next/navigation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxHeight: '80vh',
  maxWidth: '50vw',
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 3,
};

export default function ShareArticleModal({
  open,
  isArticle,
  itemId,
  commentRef,
  isPost,
  commentText,
  commentTextHandler,
  likesCommentsDetails,
  setOpen,
  setCommentText,
  articleId,
  revalidate,
}: {
  open: boolean;
  isArticle: boolean;
  itemId: string;
  commentRef: any;
  isPost?: boolean;
  commentText: string;
  commentTextHandler: (text: string) => void;
  likesCommentsDetails: any;
  setOpen: any;
  setCommentText: any;
  articleId?: string;
  revalidate?: any;
}) {
  const pathname = usePathname();
  const [checkIsShared, { isLoading }] = useCheckArticleIsSharedMutation();
  const [publishArticle, { isLoading: publishLoading }] =
    useShareArticleMutation();
  const [publishPost, { isLoading: postLoading }] = useSharePostMutation();
  const toast = useToast();

  const handlePublish = async () => {
    const result: any = await checkIsShared(itemId);
    const status: boolean = result?.data;
    const payload = {
      content: commentText,
    };
    if (status) {
      if (isArticle) {
        toast.error('This article has already been shared');
      } else {
        toast.error('This post has already been shared');
      }
    } else {
      if (isArticle) {
        await publishArticle({ articleId: itemId, status, payload });
        toast.success('Article is Published Succesfully ');
        if (revalidate) {
          revalidate(pathname);
        }
      } else {
        await publishPost({ postId: itemId, payload });
        toast.success('Post is Published Succesfully ');
      }
    }
    setCommentText('');
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {isArticle && (
          <>
            <Box sx={{ padding: '10px' }}>
              <AddComment
                id={itemId}
                commentRef={commentRef}
                commentType={isPost ? 'PostComment' : 'ArticleComment'}
                commentText={commentText}
                setCommentText={commentTextHandler}
              />
            </Box>
            {likesCommentsDetails?.coverPhotoPath && (
              <Box sx={{ padding: '10px', height: '400px' }}>
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src={likesCommentsDetails?.coverPhotoPath}
                  alt="thumbnail"
                />
              </Box>
            )}
            <Box
              sx={{
                padding: '10px',
                paddingTop: '1px',
                textTransform: 'capitalize',
              }}
            >
              <Typography variant="h1" fontSize="20px" className='text-clamp-2'>
                {likesCommentsDetails?.title}
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                paddingTop: '10px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button variant="contained" onClick={handlePublish}>
                {(isLoading || publishLoading || postLoading) && (
                  <CircularProgress size={24} color="inherit" />
                )}
                Publish
              </Button>
            </Box>
          </>
        )}
        {!isArticle && articleId && (
          <>
            <AddComment
              id={itemId}
              commentRef={commentRef}
              commentType={isPost ? 'PostComment' : 'ArticleComment'}
              commentText={commentText}
              setCommentText={commentTextHandler}
            />
            <Post
              name={likesCommentsDetails?.name}
              username={likesCommentsDetails?.username}
              createdDateTime={likesCommentsDetails?.createdDateTime}
              content={likesCommentsDetails?.content}
              shared={likesCommentsDetails?.shared}
              image={likesCommentsDetails?.image}
              link={likesCommentsDetails?.link}
              isShared={true}
              postDetails={likesCommentsDetails}
              postId={articleId}
              showComments={false}
            />
            <Box
              sx={{
                paddingTop: '10px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button variant="contained" onClick={handlePublish}>
                Publish
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}
