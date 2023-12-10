import { Box, Typography } from '@mui/material';
import ArticleContainer from './articleContainer';
import Skeleton from '@mui/material/Skeleton';

export default function ArticleContent({ articleList, loadingList }: any) {
  return (
    <Box>
      {loadingList ? (
        <Box sx={{ marginTop: 'px' }}>
          <Skeleton variant="rounded" width={'100%'} height={300} />
        </Box>
      ) : articleList && articleList.length !== 0 ? (
        articleList?.map((data: any, index: number) => (
          <ArticleContainer
            key={`articleContainer${index}`}
            articleDetails={data && data.article ? data.article : null}
            userDetails={data && data.user ? data.user : null}
          />
        ))
      ) : (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}
        >
          <Typography variant="h5">There are no articles yet</Typography>
        </Box>
      )}
    </Box>
  );
}
