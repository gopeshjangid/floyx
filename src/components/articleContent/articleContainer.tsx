'use client';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import UserCard from '../UserCard';
import BookMarkIcon from '@/images/image/bookMarkIcon';
import { useGetTipHistoryQuery } from '@/lib/redux/slices/earnings';
import DottedButton from './dottedButton';
import ShareIcon from '@/images/image/shareIcon';
import FlagIcon from '@/images/image/flagIcon';
import BlockUserIcon from '@/images/image/blockUser';
import { useState } from 'react';
import ActionModal from './actionModal';
import { useDeleteArticleMutation } from '@/lib/redux';

const ArticleContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: '40px',
  borderRadius: '10px',
  cursor: 'pointer',
  '&:hover': {
    cursor: 'pointer',
  },
  '& .thumbnail': {
    width: '30%',
    "& .thumbnailBox": {
      position: 'relative',
      width: '100%',
      height: '100%', 
      "& .dottedButton": {
        position: 'absolute',
        top: '10px',
        left: '10px',
      },
      "& img": {
        width: '100%',
        height: '100%',
      }
    },
    // img: {
    //   width: '100%',
    //   // aspectRatio: '1/1',
    // },
  },
  '& .details': {
    width: '70%',
    padding: '18px',
    border: `1px solid ${theme.palette.primary.boxBorder}`,
    borderRadius: '0 10px 10px 0',
    '& .date': {
      display: 'flex',
      justifyContent: 'centre',
      alignItems: 'end',
      color: `${theme.palette.text.disabled}`,
    },
    '& .top': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'centre',
      width: '100%',
      color: `${theme.palette.text.secondary}`,
    },
    '& .middle': {
      width: '70%',
      color: `${theme.palette.text.disabled}`,
      wordWrap: 'break-word',
    },
    '& .bottom': {
      marginTop: '40px',
      display: 'flex',
      justifyContent: 'space-between',
      bottom: '0',
      '& .author-details': {
        display: 'flex',
      },
    },
  },
}));

const options = [
  {
    name: 'Report Article',
    icon: <FlagIcon />,
  },
  {
    name: 'Block User',
    icon: <BlockUserIcon />,
  },
  {
    name: 'Report User',
    icon: <FlagIcon />,
  },
  {
    name: 'Share Article',
    icon: <ShareIcon />,
  },
];

const addEditoptions = [
  {
    name: 'Edit',
  },
  {
    name: 'Delete',
  },
];

export default function ArticleContainer({
  articleDetails,
  userDetails,
  addEdittype,
  setIsEditing,
  setArticleId,
  setValue,
  setIsReset,
}: any) {
  const { palette } = useTheme();
  const [item, setItem] = useState<number>();
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const { data: tipHistory } = useGetTipHistoryQuery();
  const [deleteArtice] = useDeleteArticleMutation()

  const content = articleDetails?.content
    ? JSON.parse(articleDetails?.content)
    : [];
  const description = content.length > 0 ? content[0]?.value : '';

  const createMarkup = (htmlString: string) => {
    return { __html: htmlString };
  };

  const handleClick = () => {
    const dynamicUrl = `/article/${userDetails?.username}/${articleDetails?.publicUrl}`;
    window.open(dynamicUrl, '_blank');
  };

  const tippedOrNot = () => {
    const check = tipHistory?.filter(
      val => val?.articleId === articleDetails?.id
    );
    if (check?.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleOption = (index: number) => {
    if (addEdittype) {
      switch (index) {
        case 0:
          setArticleId(articleDetails?.id);
          setIsEditing(true);
          setIsReset(false);
          setValue('newArticle');
          // window.open('/composer/create');
          return;
        case 1:
          setOpenConfirmationDialog(true);
          return;
      }
    } else {
      setOpenDialog(true);
      setItem(index);
    }
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpenConfirmationDialog(false);
  };

  const handleDeleteArticle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteArtice(articleDetails?.id)
  };

  return (
    <>
      <ArticleContent onClick={handleClick}>
        <Box className="thumbnail">
          {(articleDetails?.coverPhotoThumbnail || articleDetails?.coverPhotoPath) ? (
            <Box className="thumbnailBox">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                style={{ }}
                src={articleDetails?.coverPhotoThumbnail || articleDetails?.coverPhotoPath}
                alt="thumbnail"
              />
              <Box className="dottedButton">
                <DottedButton
                  options={addEdittype ? addEditoptions : options}
                  setItem={setItem}
                  handleOption={handleOption}
                />
              </Box>
            </Box>
          ) : (
              <Box className="thumbnailBox">
                <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: palette.background.paper,
                }}>
                  {"No Image"}
                </Box>
                
                <Box className="dottedButton">
                <DottedButton
                  options={addEdittype ? addEditoptions : options}
                  setItem={setItem}
                  handleOption={handleOption}
                />
              </Box>
            </Box>
          )}
        </Box>
        <Box className="details">
          <Box className="top">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '80%',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  width: 'auto',
                  textWrap: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {articleDetails?.title ? 
                  articleDetails?.title
                 : ""}
              </Typography>
              <Typography variant="caption" sx={{ textWrap: 'nowrap' }}>
                {tipHistory ? (
                  tippedOrNot() ? (
                    '  (!You Tipped)'
                  ) : (
                    ''
                  )
                ) : (
                  <Skeleton variant="text" width={100} />
                )}
              </Typography>
            </Box>
            <IconButton onClick={(e) => e.stopPropagation()}>
              <BookMarkIcon />
            </IconButton>
          </Box>
          <Box className="middle">
            <Typography
              variant="body2"
              sx={{
                minHeight: `${40}px`,
                maxHeight: `${40 * 2}px`,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}
            >
              <div dangerouslySetInnerHTML={createMarkup(description)} />
            </Typography>
          </Box>
          {userDetails && <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <UserCard
              name={userDetails?.name}
              username={userDetails?.username}
              showDate={articleDetails?.publicationDate}
              isArticle={true}
            />
          </Box>}
        </Box>
      </ArticleContent>
      <ActionModal
        item={item}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        articleDetails={articleDetails}
        username={userDetails?.username}
      />
      <Dialog
        open={openConfirmationDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{ sx: { background: palette.background.default } }}
        onClick={event => event.stopPropagation()}
      >
        <DialogTitle id="responsive-dialog-title">Please Confirm</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this Article ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteArticle}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
