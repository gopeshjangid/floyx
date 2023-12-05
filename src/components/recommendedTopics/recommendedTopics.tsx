import { Box, Grid, Typography } from '@mui/material';

const recommendedTopics = [
  {
    text: 'Crypto',
    value: 'crypto',
  },
  {
    text: 'Gaming console',
    value: 'crypto',
  },
  {
    text: 'AirDrop',
    value: 'airdrop',
  },
  {
    text: 'Search',
    value: 'search',
  },
  {
    text: 'Gaming console',
    value: 'crypto',
  },
  {
    text: 'Car',
    value: 'car',
  },
  {
    text: 'Motor Cycle',
    value: 'motorcycle',
  },
];

export default function RecommendedTopics() {
  return (
    <Box sx={{ marginTop: '30px', width: '100%' }}>
      <Typography variant="h5">Recommended Topics</Typography>
      <Box sx={{marginTop:'20px'}}>
        <Grid container>
          {recommendedTopics.map(val => (
            <Grid
              item
              xs="auto"
              key={val.value}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '20px',
                border: '1px solid white',
                padding: '10px 10px 5px 10px',
                width: 'fit-Content',
                margin: '10px',
              }}
            >
              <Typography variant="body2">{val.text}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
