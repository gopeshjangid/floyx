import { Box, Typography, Button, Grid } from '@mui/material';
import UserCard from '@/components/UserCard';
import StarIcon from '@/images/image/star';
import BookMarkIcon from '@/images/image/archiveMinus';
import FaceBookIcon from '@/images/image/facebookIcon';
import LinkedinIcon from '@/images/image/linkedin';
import TwitterIcon from '@/images/image/twitter';

const TAGS = ['inspiration', 'adventure', 'creativity', 'explore', 'science', 'geography'];

export default function FullArticle({ details }: any) {
  
  const CONTENT = details?.article?.content && JSON.parse(details?.article?.content)
  console.log(details?.article, 'articleDetails')
  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Button variant="text" startIcon={<BookMarkIcon />}>
          Bookmark
        </Button>
        <Typography variant="h1">{details?.article?.title}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex' }}>
          <Box>
            <UserCard
              name={details?.user?.name}
              displayPicture={details?.user?.avatar}
              username={details?.user?.username}
              showDate={details?.article?.publicationDate}
            />
          </Box>
          <Box sx={{ padding: '20px 10px' }}>
            <Button variant="outlined" size="small" sx={{ borderRadius: '30px', padding: '3px 15px' }}>
              Follow
            </Button>
          </Box>
        </Box>
        <Box sx={{ padding: '20px 10px', display: 'flex', alignItems: 'center' }}>
          <Button variant="outlined" size="small" startIcon={<StarIcon />}>
            1420 Points
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Grid container>
          {details?.article?.tags && details?.article?.tags.map(val => (
            <Grid
              item
              xs="auto"
              key={val}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50px',
                border: '1px solid white',
                padding: '10px 20px',
                width: 'fit-Content',
                margin: '10px',
              }}
            >
              <Typography variant="body2">#{val}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <img src={details?.article?.coverPhotoPath} width={'100%'} />
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        {CONTENT && CONTENT.map((val: any, index: number) => (
          <Box sx={{ padding: '10px 0' }} key={`articleDetail${index}`}>
            {val?.type === 'paragraph' ? (
              <Typography variant="body1">{val?.value}</Typography>
            ) : (
              <Typography variant="h2">{val?.value}</Typography>
            )}
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Button variant="text">
            <Typography variant="subtitle2">Edit</Typography>
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ marginRight: '5px' }}>
            <Typography variant="body1">Share:</Typography>
          </Box>
          <Box sx={{ marginRight: '5px' }}>
            <FaceBookIcon />
          </Box>
          <Box sx={{ marginRight: '5px' }}>
            <LinkedinIcon />
          </Box>
          <Box sx={{ marginRight: '5px' }}>
            <TwitterIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
