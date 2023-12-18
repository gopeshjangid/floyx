'use client';
import { useGetTipHistoryQuery } from '@/lib/redux/slices/earnings';
import { Box, Typography, Slider, Button, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import { useSetTipMutation } from '@/lib/redux/slices/articleDetails';
import { useToast } from "../Toast/useToast";

export default function TipColumn({
  details,
  articlePuclicUrl,
  articleId,
}: any) {
  const [value, setValue] = useState<number>(30);
  const [updateTip, {isError, error}] = useSetTipMutation();
  const { data: tipHistory } = useGetTipHistoryQuery();
  const toast = useToast();
  const { palette } = useTheme();

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleTip = () => {
    const payload: any = {
      articleId: details?.article?.id,
      articlePublicUrl: articlePuclicUrl,
      articleTipAmount: value / 10000,
      articleUserId: details?.user?.id,
      userTipAmount: (100 - value) / 10000,
    };
    updateTip(payload);
  };

  const tippedOrNot = () => {
    const check = tipHistory?.filter(val => val?.articleId === articleId);
    if (check?.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (isError) {
      if (error) {
        let message = "";
        switch (error as string) {
          case "already_tipped_article":
            message = "Already tipped this article";
            break; 
          case "Please_tip_after_10_minutes":
            message = "You must wait 10 minutes to tip again";
            break; 
          case "you_cannot_tip_your_own_article":
            message = "You cannot tip your own articles";
            break; 
        }
        toast.error(message);
      }
    }
  }, [isError, error])
  return (
    <>
      {!tippedOrNot() ? (
        <Box
          sx={{
            width: '100%',
            marginTop: '30px',
            border: '1px solid white',
            padding: '20px 40px',
            borderRadius: '10px',
            background:palette.background.paper,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              Split the amount of 0.01 points for you and the author, we pay the
              tips from our rewards pool.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '25px',
            }}
          >
            <Slider
              // aria-label="Disabled slider"
              sx={{ width: '50%' }}
              value={value}
              onChange={handleChange}
              aria-labelledby="discrete-slider-small-steps"
              step={10}
              marks
              min={20}
              max={100}
              valueLabelDisplay="auto"
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '15px',
            }}
          >
            <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
              {value}% to author / {100 - value}% to me
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '25px',
            }}
          >
            <Button variant="contained" onClick={handleTip}>
              Tip
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              Start earning money by reading articles!
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            marginTop: '30px',
            border: '1px solid white',
            padding: '20px 40px',
            borderRadius: '10px',
            textAlign: 'center',
            background:palette.background.paper,
          }}
        >
          <Typography variant="body1">
            You have already tipped this article
          </Typography>
          <TaskAltSharpIcon/>
        </Box>
      )}
    </>
  );
}
