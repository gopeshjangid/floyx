import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Box } from '@mui/material';

interface InfiniteScrollComponentProps<T> {
  data: T[];
  loadMore: () => void;
  hasMore: boolean;
  loader: JSX.Element;
  renderItem: (item: T, index: number) => JSX.Element;
  threshold?: number;
}

function InfiniteScrollComponent<T>({
  data,
  loadMore,
  hasMore,
  loader,
  renderItem,
  threshold = 250,
}: InfiniteScrollComponentProps<T>) {
  return (
    <Box sx={{ overflow: 'auto', height: '100%' }}>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        loader={loader}
        threshold={threshold}
        useWindow={false}
      >
        {data.map((item, index) => renderItem(item, index))}
      </InfiniteScroll>
    </Box>
  );
}

export default InfiniteScrollComponent;
