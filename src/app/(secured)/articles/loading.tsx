import ArticleCardSkeleton from '@/components/ArticleCardSkeleton';
import { Box, Grid, Skeleton } from '@mui/material';

export default function LoadingArticleHead() {
  return (
    <Box mt={2}>
      <Grid container spacing={1}>
        <Grid xs={12} sm={8} item>
          <Box p={2} gap={1}>
            <Skeleton variant="rounded" width="100%" height="200px" />
            <ArticleCardSkeleton repeats={2} />
          </Box>
        </Grid>
        <Grid xs={12} sm={4} item gap={1}>
          <Box p={2}>
            <Skeleton variant="rounded" width="100%" height="200px" />
          </Box>
          <Box p={2}>
            <Skeleton variant="rounded" width="100%" height="200px" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
