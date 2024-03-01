'use client';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Skeleton,
  Stack,
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
import { useCallback, useRef, useState } from 'react';
import ActionModal from './actionModal';
import { useDeleteArticleMutation } from '@/lib/redux';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import ShareArticleModal from '../fullArticle/shareArticleModal';
import CustomDescription from '../customDescription';
import useDevice from '@/lib/hooks/useDevice';
import { DeleteOutline, EditRounded } from '@mui/icons-material';

const ArticleContent = styled(Box)(({ theme }) => ({
  marginTop: '40px',
  height: '100%',
  width: '100%',
  background: theme.palette.primary.mainBackground,
  border: `1px solid ${theme.palette.primary.boxBorder}`,
  borderRadius: '10px',
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    cursor: 'pointer',
  },
  '& .thumbnail': {
    height: '100%',
    width: '100%',
    '& .thumbnailBox': {
      position: 'relative',
      width: '100%',
      height: '100%',
      '& .dottedButton': {
        position: 'absolute',
        top: '10px',
        left: '10px',
      },
      '& img': {
        width: '100%',
        height: '100%',
      },
    },
  },
  '& .details': {
    borderRadius: '0 10px 10px 0',
    height: '100%',
    width: '100%',
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

const articleOptions = [
  {
    name: 'Edit Article',
    icon: <EditRounded />,
  },
  {
    name: 'Report Article',
    icon: <FlagIcon />,
  },
  {
    name: 'Share Article',
    icon: <ShareIcon articleOption={true} />,
  },
];

const userOptions = [
  {
    name: 'Block User',
    icon: <BlockUserIcon />,
  },
  {
    name: 'Report User',
    icon: <FlagIcon />,
  },
];
const addEditoptions = [
  {
    name: 'Edit',
    icon : <EditRounded/>
  },
  {
    name: 'Delete',
    icon: <DeleteOutline/>
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
  const {t}=useTranslation()
  const { palette } = useTheme();
  const ref = useRef<HTMLElement>(null);
  const router = useRouter();
  const session = useSession();
  const loginUserName = session.data?.user?.username;
  const [open, setOpen] = useState(false);
  const commentRef = useRef();
  const [commentText, setCommentText] = useState('');
  const { isMobile } = useDevice();
  const [item, setItem] = useState<number>();
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const { data: tipHistory } = useGetTipHistoryQuery();
  const [deleteArtice] = useDeleteArticleMutation();

  const content = articleDetails?.content
    ? JSON.parse(articleDetails?.content)
    : [];
  const description = content.length > 0 ? content[0]?.value : '';

  const createMarkup = (htmlString: string) => {
    return { __html: htmlString };
  };

  const handleClick = () => {
    if (userDetails) {
      const dynamicUrl = `/article/${userDetails?.username}/${articleDetails?.publicUrl}`;
      router.push(dynamicUrl);
    } else {
      handleOption(0);
    }
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

  const editHandler = ()=>{
    const dynamicUrl = `/composer/create?articleId=${articleDetails.id}&isEditing=true&value=newArticle`;
    router.push(dynamicUrl);
  }

  const handleOption = (index: number) => {
    const allowEdit = userDetails?.username === loginUserName;
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
    } if(index ===0 && allowEdit){
      editHandler();
    } else {
      // const []
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
    deleteArtice(articleDetails?.id);
    setOpenConfirmationDialog(false);
  };
  const { offsetHeight, offsetWidth } = ref?.current ?? {
    offsetHeight: 0,
    offsetWidth: 0,
  };
  const commentTextHandler = useCallback(
    text => {
      setCommentText(text);
    },
    [setCommentText]
  );

  const articleOptionsFiltered = articleOptions.filter(item => item.name ==='Edit'  ? userDetails?.username === loginUserName : true );
  return (
    <>
      <ArticleContent onClick={handleClick}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={5}>
            <Box className="thumbnail" ref={ref}>
              {articleDetails?.coverPhotoThumbnail ||
              articleDetails?.coverPhotoPath ? (
                <Box
                  position="relative"
                  height={isMobile ? 300 : 240}
                  width={isMobile ? window.document.body.clientWidth - 32 : '100%'}
                >
                  <Image
                    fill
                    objectFit="cover"
                    objectPosition="center"
                    src={
                      articleDetails?.coverPhotoThumbnail ||
                      articleDetails?.coverPhotoPath
                    }
                    alt="thumbnail"
                  />
                  <Box className="dottedButton">
                    <DottedButton
                      options={
                        addEdittype
                          ? addEditoptions
                          : userDetails?.username === loginUserName
                            ? articleOptionsFiltered
                            : [...articleOptionsFiltered, ...userOptions]
                      }
                      setItem={setItem}
                      setOpen={setOpen}
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
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: palette.background.paper,
                    }}
                  >
                    <Typography translate="no" variant="body2">{t("comp.articleContent.noPhoto")}</Typography>
                  </Box>
                  <Box className="dottedButton">
                    <DottedButton
                      options={
                        addEdittype
                          ? addEditoptions
                          : userDetails?.username === loginUserName
                            ? articleOptionsFiltered
                            : [...articleOptionsFiltered, ...userOptions]
                      }
                      setItem={setItem}
                      setOpen={setOpen}
                      handleOption={handleOption}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Box className="details" p={1}>
              <Box className="top">
                <Stack justifyContent={'flex-start'} direction={'column'}>
                  {articleDetails.modifiedDate && (
                    <Typography translate="no">
                      {` ${t("comp.articleContent.lastSaved")} ${moment(
                        articleDetails.modifiedDate
                      ).format('LL')}`}
                    </Typography>
                  )}
                  <CustomDescription
                    variant="h5"
                    color={palette.primary.titleColor}
                    className='text-clamp-2'
                  >
                    {articleDetails?.title
                      ? articleDetails?.title.slice(0, 70)
                      : ''}
                  </CustomDescription>
                  <Typography translate ="no" color='green' variant="caption" sx={{ textWrap: 'nowrap' }}>
                    {tipHistory ? (
                      tippedOrNot() ? (t("comp.articleContent.tipped")
                        
                      ) : (
                        ''
                      )
                    ) : (
                      <Skeleton variant="text" width={100} />
                    )}
                  </Typography>
                </Stack>
                <IconButton onClick={e => e.stopPropagation()} sx={{width:40,height:40}}>
                  <BookMarkIcon />
                </IconButton>
              </Box>
              <Box className="middle">
                <Typography
                  variant="body2"
                  // color={"textPrimary"}
                  component={'span'}
                  color={palette.mode === 'light' ? 'primary' : 'textPrimary'}
                  className='text-clamp-2'
                  dangerouslySetInnerHTML={createMarkup(description)} />
              </Box>
              {userDetails && (
                <Box
                  py={1}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <UserCard
                    name={userDetails?.name}
                    username={userDetails?.username}
                    showDate={articleDetails?.publicationDate}
                    isArticle={true}
                  />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </ArticleContent>
      <ActionModal
        item={item}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        articleDetails={articleDetails}
        username={userDetails?.username}
        setItem={setItem}
        text={item === 4 ? 'Material' : 'User'}
      />
      <ShareArticleModal
        open={open}
        isArticle={true}
        itemId={articleDetails.id}
        commentRef={commentRef}
        isPost={false}
        commentText={commentText}
        commentTextHandler={commentTextHandler}
        likesCommentsDetails={articleDetails}
        setCommentText={setCommentText}
        setOpen={setOpen}
      />
      <Dialog
        open={openConfirmationDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{ sx: { background: palette.background.default } }}
        onClick={event => event.stopPropagation()}
      >
        <DialogTitle translate="no" id="responsive-dialog-title">{t("comp.articleContent.confirm")}</DialogTitle>
        <DialogContent translate="no">
          {t("comp.articleContent.confirmDelete")}
         
        </DialogContent>
        <DialogActions>
          <Button translate="no" onClick={handleDeleteArticle}>{t("comp.articleContent.yes")}</Button>
          <Button translate="no" onClick={handleClose}>{t("comp.articleContent.no")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
