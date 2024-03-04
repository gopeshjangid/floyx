'use client';

import moment from 'moment';
import * as React from 'react';
import { StyledTypography } from '../StyledSecondaryText';
import { useTranslation } from 'react-i18next';

const DateParser = ({ date }: any) => {
  const { t } = useTranslation();
  const dateVal = `${moment(new Date(date)).fromNow(true)} ${t('Home.postSection.ago')}`;
  return (
    <StyledTypography translate="no" variant="body2" color={'text'}>
      {dateVal}
    </StyledTypography>
  );
};

export default DateParser;
