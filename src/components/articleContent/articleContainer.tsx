'use client';

import { Box, IconButton, Skeleton, Typography } from '@mui/material';
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
    // img: {
    //   width: '100%',
    //   // aspectRatio: '1/1',
    // },
  },
  '& .details': {
    width: '70%',
    padding: '18px',
    border: `1px solid ${theme.palette.text.disabled}`,
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

export default function ArticleContainer({ articleDetails, userDetails }: any) {
  const [item, setItem] = useState<number>();
  const [openDialog, setOpenDialog] = useState(false);

  const { data: tipHistory } = useGetTipHistoryQuery();

  const content = JSON.parse(articleDetails?.content);
  const description = content[0]?.value;

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
    setOpenDialog(true);
    setItem(index);
  }
  return (
    <>
      <ArticleContent onClick={handleClick}>
        <Box className="thumbnail">
          {articleDetails?.coverPhotoThumbnail ? (
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: '100%' }}
                src={articleDetails?.coverPhotoThumbnail}
                alt="thumbnail"
              />
              <Box sx={{position: 'absolute', top: '10px', left: '10px'}}>
                <DottedButton options={options} setItem={setItem} handleOption={handleOption}/>
              </Box>
              <ActionModal item={item} openDialog={openDialog} setOpenDialog={setOpenDialog} articleDetails={articleDetails} username={userDetails?.username}/>
            </Box>
          ) : (
            <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
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
                {articleDetails?.title ? (
                  articleDetails?.title
                ) : (
                  <Skeleton variant="text" width={400} />
                )}
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
            <IconButton>
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <UserCard
                name={userDetails?.name}
                username={userDetails?.username}
                showDate={articleDetails?.publicationDate}
              />
            </Box>
          </Box>
          {/* <Box className="bottom">
          <Box className="author-details">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <UserAvatar
                alt="Travis Howard"
                src={userDetails?.avatar}
                sx={{
                  width: { md: '40px', xs: '40px' },
                  height: { md: '40px', xs: '40px' },
                }}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2">{userDetails?.name}</Typography>
              <Typography variant="caption">{userDetails?.username}</Typography>
            </Box>
          </Box>
          <Box className="date">
            <CalendarMonthOutlinedIcon fontSize='small'/>
            <Typography variant="caption" sx={{marginBottom:'0px'}}>{moment(articleDetails?.publishedDate).format('MMM DD, YY')}</Typography>
          </Box>
        </Box> */}
        </Box>
      </ArticleContent>
    </>
  );
}
