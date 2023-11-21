import RecommendedTopics from '@/components/recommendedTopics/recommendedTopics';
import SearchBarArcticleRight from '@/components/searchBar/searchBarArcticleRight';
import WhoToFollow from '@/components/whoToFollow/whoToFollow';
import { Box } from '@mui/material';
import { Suspense } from 'react';
import Loading from './loading';

export default function Page({}) {
  return (
    <Box sx={{ marginLeft: '60px', width: '30%' }}>
      <SearchBarArcticleRight />
      <RecommendedTopics />
      <Suspense fallback={<Loading/>}>
        <WhoToFollow />
      </Suspense>
    </Box>
  );
}
