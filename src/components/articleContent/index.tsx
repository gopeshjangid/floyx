import { Box } from '@mui/material';
import ArticleContainer from './articleContainer';
import Skeleton from '@mui/material/Skeleton';

export default function ArticleContent({ articleList, loadingList }: any) {
  return (
    <Box>
      {loadingList ? (
        <Box sx={{marginTop:'px'}}>
          <Skeleton variant="rounded" width={'100%'} height={300} />
        </Box>
      ) : (
        articleList?.map((data: any, index: number) => (
          <ArticleContainer
            key={`articleContainer${index}`}
            articleDetails={data && data.article ? data.article : null}
            userDetails={data && data.user ? data.user : null}
          />
        ))
      )}
    </Box>
  );
}
