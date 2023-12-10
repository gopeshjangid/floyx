import { Skeleton } from '@mui/material';

export default function LoadingArticleHead() {
  return (<Skeleton variant="text" height={'100%'} width={'100%'} animation='wave' sx={{margin:'0px', padding:'0px'}}/>);
}
