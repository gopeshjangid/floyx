'use client';

import React, { ReactNode, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import PrivacyPolicy from '@/components/PrivacyPolicy';
import TermsOfService from '@/components/TermsOfService';
import Wrapper from '@/components/wrapper';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: { md: 4, xs: 2 } }}>{children}</Box>}
    </div>
  );
}

const Help = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Wrapper
      sx={{
        marginTop: '25px',
        maxWidth: '70%',
      }}
    >
      <Tabs
        sx={{
          height: '70px',
          '.MuiTabs-flexContainer': {
            height: '100%',
          },
        }}
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        aria-label="help tabs"
      >
        <Tab label="Terms of service" />
        <Tab label="Privacy Policy" />
      </Tabs>

      <Box className="notifications-content">
        <CustomTabPanel value={value} index={0}>
          <TermsOfService />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <PrivacyPolicy />
        </CustomTabPanel>
      </Box>
    </Wrapper>
  );
};

export default Help;
