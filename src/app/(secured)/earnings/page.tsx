// // @ts-nocheck
// /* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as React from 'react';
import { Box, Paper } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DailyIcon from '@/iconComponents/dailyTaskIcon';
import Earnings from './_components/earnings';
import EaringTabIcon from '@/iconComponents/earningTabIcon';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';
import DailyTask from './_components/dailyTask';
import { GradientText } from '@/components/usernameLink';
import { useTranslation } from 'react-i18next';

const Page: React.FC = () => {
  const { palette } = useTheme();
  const isMobile = useMediaQuery('(max-width:480px)');
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
const {t}=useTranslation()
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon tabs example"
        >
          <Tab
          translate="no"
            iconPosition="start"
            icon={
              <EaringTabIcon fill={value === 0 && palette.background.paper} />
            }
            label={
              value === 0 ? <GradientText>  {t("secure.article.label.text3")}</GradientText> :t("secure.article.label.text3")
            }
            aria-label="phone"
          />
          <Tab
          translate="no"
            iconPosition="start"
            icon={<DailyIcon fill={value === 1 && palette.background.paper} />}
            label={
              value === 1 ? (
                <GradientText>{t("secure.article.label.text4")}</GradientText>
              ) : (
                t("secure.article.label.text4")
              )
            }
            aria-label="favorite"
          />
        </Tabs>
      </Box>
      <Paper
        sx={{
          backgroundColor: palette.primary[700],
          borderRadius: '10px',
          border: !isMobile ? '1px solid ' + palette.action['border'] : '',
        }}
      >
        {value === 0 ? <Earnings /> : <DailyTask />}
      </Paper>
    </Box>
  );
};

export default Page;
