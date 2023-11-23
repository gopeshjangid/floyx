import { Box, Typography, Slider, Button } from '@mui/material';

export default function TipColumn() {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '30px',
        border: '1px solid white',
        padding: '20px 40px',
        borderRadius: '10px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Split the amount of 0.01 points for you and the author, we pay the tips from our rewards pool.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
        <Slider defaultValue={100} aria-label="Disabled slider" sx={{ width: '50%' }} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
        <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
          40% to author / 60% to me
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
        <Button variant="contained">Tip</Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px'  }}>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Start earning money by reading articles!
        </Typography>
      </Box>
    </Box>
  );
}
