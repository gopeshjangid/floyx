import { Box, Divider, Skeleton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Loading() {
  const {t}=useTranslation()
  return (
    <Box sx={{ marginTop: '40px' }}>
      <Typography translate="no" color="textPrimary">
        {t('comp.recommTopic.whotofollow')}
      </Typography>
      <Box sx={{ marginTop: '30px', padding: '0 10px 10px 0', width: '100%' }}>
        <Box sx={{ display: 'flex', marginTop: '10px' }}>
          <Box>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              animation="wave"
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Skeleton width={'60%'} height={20} animation="wave" />
            <Skeleton width={'40%'} height={20} animation="wave" />
          </Box>
        </Box>
        <Box>
          <Skeleton width={'100%'} height={80} animation="wave" />
        </Box>
        <Divider />
      </Box>
    </Box>
  );
}
