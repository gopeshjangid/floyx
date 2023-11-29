'use client'
import { useSetTipMutation } from '@/lib/redux/slices/articleTotalEarnings';
import { Box, Typography, Slider, Button } from '@mui/material';
import { useState } from 'react';

export default function TipColumn({details, articlePuclicUrl}:any) {
    const [value, setValue] = useState<number>(30);
    const [updateTip] = useSetTipMutation()

  
    const handleChange = (event:any, newValue: any) => {
      setValue(newValue);
    };

    const handleTip = () => {
      const payload:any = {
        "articleId":details?.article?.id,
        "articlePublicUrl":articlePuclicUrl,
        "articleTipAmount":value/10000,
        "articleUserId":details?.user?.id,
        "userTipAmount":(100-value)/10000
      }
      updateTip(payload)
    }

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
        <Slider
          // aria-label="Disabled slider"
          sx={{ width: '50%' }}
          value={value}
          onChange={handleChange}
          aria-labelledby="discrete-slider-small-steps"
          step={10}
          marks
          min={0}
          max={100}
          valueLabelDisplay="auto"
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
        <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
          {value}% to author / {100-value}% to me
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
        <Button variant="contained" onClick={handleTip}>Tip</Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Start earning money by reading articles!
        </Typography>
      </Box>
    </Box>
  );
}
