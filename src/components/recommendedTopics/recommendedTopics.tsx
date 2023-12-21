import { Box, Grid, Typography, useTheme } from '@mui/material';
import CustomChip from "../CustomGridientChip";

const recommendedTopics = [
  {
    text: 'Crypto',
    value: 'crypto',
  },
  {
    text: 'Gaming console',
    value: 'gamingConsole',
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
    value: 'crcrc',
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
  const { palette } = useTheme();

  return (
    <Box sx={{ marginTop: '30px', width: '100%' }}>
      <Typography
        color={palette.mode === "light" ? "primary" : "textPrimary"}
        variant="h5"
      >
        Hot Topics
      </Typography>
      <Box sx={{marginTop:'20px'}}>
        <Grid container>
          {recommendedTopics.map((val, index) => (
            <CustomChip
              key={'topics' + index}
              label={val?.text}
              component="a"
              href="#basic-chip"
              clickable
              style={{ marginBottom: 10, marginRight: 10 }}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
