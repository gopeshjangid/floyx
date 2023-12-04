import AddPost from '@/components/Post/AddPost';
import PostList from '@/components/Post/PostList';
import PostHeader from '@/components/PostHeader';

import { Grid } from '@mui/material';

export default function Page() {
  return (
    <Grid sx={{ width: { xs: '100%', sm: '70%' }, padding: '0 20px' }}>
      <PostHeader />
      <AddPost />
      <PostList />
    </Grid>
  );
}
