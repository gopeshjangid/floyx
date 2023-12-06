import { Box } from '@mui/material';
import ArticleContainer from './articleContainer';

export default function ArticleContent({ articleList }: any) {
  return (
    <Box>
      {articleList?.map((data: any, index: number) => (
        <ArticleContainer
          key={`articleContainer${index}`}
          articleDetails={data && data.article ? data.article : null}
          userDetails={data && data.user ? data.user : null}
        />
      ))}
    </Box>
  );
}
