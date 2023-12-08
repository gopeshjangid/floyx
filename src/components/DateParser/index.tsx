"use client";

import moment from 'moment'
import * as React from 'react'
import { StyledTypography } from "../StyledSecondaryText"

const DateParser = ({ date }: any) => {
  const dateVal = `${moment(new Date(date)).fromNow(true)} ago`
  return <StyledTypography variant="body2" color={"text"}>{dateVal}</StyledTypography>
}

export default DateParser
