import * as React from 'react';
import { useMediaQuery } from '@mui/material';
const SVGComponent = (props:any) => {
  const isMobile = useMediaQuery('(max-width:480px)');
  return (
    <svg
      width={isMobile ? 103 : 133}
      height={30}
      viewBox={`0 0 ${isMobile ? 143 : 133} 30`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M49.7281 5.81299V9.17433H39.7599V14.4829H49.2267V17.9776H39.7165V26.8967H35.8828V5.81299H49.7281Z"
        fill={props.fill}
      />
      <path
        d="M57.5574 5.81299V23.5064H65.9318V26.8967H53.6484V5.81299H57.5574Z"
        fill={props.fill}
      />
      <path
        d="M67.2734 16.3838C67.2734 9.23803 70.8028 5.66516 77.8588 5.66516C84.8075 5.66516 88.2818 9.23803 88.2818 16.3838C88.2818 23.4918 84.8075 27.0444 77.8588 27.0444C71.1158 27.0444 67.5864 23.4918 67.2734 16.3838ZM77.8588 23.6541C82.1039 23.6541 84.2279 21.2027 84.2279 16.2968C84.2279 11.4693 82.1039 9.05837 77.8588 9.05837C73.5035 9.05837 71.3273 11.4722 71.3273 16.2968C71.3273 21.2027 73.5035 23.6541 77.8588 23.6541Z"
        fill={props.fill}
      />
      <path
        d="M89.6484 5.81299H93.8501L99.7759 15.9723L105.348 5.81299H109.402L101.648 19.5249V26.8967H97.7417V19.5249L89.6484 5.81299Z"
        fill={props.fill}
      />
      <path
        d="M116.411 5.81299H111.471L119.773 16.3548L111.471 26.8967H116.411L122.236 19.2004L128.06 26.8967H133.001L116.411 5.81299Z"
        fill={props.fill}
      />
      <path
        d="M24.8449 0.402781L23.2918 1.29527L0.654882 14.3668L0 14.7464L0.6317 15.1637L0.764994 15.2506H0.78238L8.75687 19.8551L0.724426 24.729L0.498405 24.8652V25.1289V28.78V29.6117L1.21124 29.1799L12.7673 22.1703L24.842 29.1422L25.5462 29.5479V28.7365V25.1289V24.8594L25.3115 24.7261L8.07011 14.7725L25.3115 4.81888L25.5462 4.68559V4.41321V0.80846V0L24.8449 0.402781Z"
        fill="url(#paint0_linear_1015_22917)"
      />
      <path
        d="M14.7344 16.2446L18.7303 18.5657L25.3197 14.5552L25.5457 14.419V14.1554V10.5042V9.67261L24.8329 10.1044L14.7344 16.2446Z"
        fill="url(#paint1_linear_1015_22917)"
      />
      <path
        d="M12.7721 24.5898C11.387 24.5898 10.2598 25.7171 10.2598 27.0993C10.2598 28.4844 11.387 29.6116 12.7721 29.6116C14.1572 29.6116 15.2815 28.4844 15.2815 27.0993C15.2815 25.7142 14.1572 24.5898 12.7721 24.5898Z"
        fill="url(#paint2_linear_1015_22917)"
      />
      <path
        d="M8.0702 14.7725L3.99023 17.1022L8.75696 19.855L12.2284 17.1718L8.0702 14.7725Z"
        fill="url(#paint3_linear_1015_22917)"
      />
      <path
        d="M8.75554 19.8551L12.766 22.1704L6.81988 25.778L3.41797 23.0947L8.75554 19.8551Z"
        fill="url(#paint4_linear_1015_22917)"
      />
      <path
        d="M132.999 5.81274H128.058L123.428 11.9298L125.928 14.8072L132.999 5.81274Z"
        fill="url(#paint5_linear_1015_22917)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1015_22917"
          x1={12.7724}
          y1={31.4468}
          x2={12.7724}
          y2={1.93555}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BA24ED" />
          <stop offset={1} stopColor="#01EBFA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1015_22917"
          x1={20.139}
          y1={31.4468}
          x2={20.139}
          y2={1.93562}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BA24ED" />
          <stop offset={1} stopColor="#01EBFA" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1015_22917"
          x1={12.7714}
          y1={31.4467}
          x2={12.7714}
          y2={1.93546}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BA24ED" />
          <stop offset={1} stopColor="#01EBFA" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_1015_22917"
          x1={6.13315}
          y1={14.0969}
          x2={8.05461}
          y2={17.053}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#21286B" />
          <stop offset={1} stopColor="#21286B" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="paint4_linear_1015_22917"
          x1={10.3447}
          y1={18.9292}
          x2={9.03659}
          y2={21.0797}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#21286B" />
          <stop offset={1} stopColor="#21286B" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="paint5_linear_1015_22917"
          x1={121.141}
          y1={18.1711}
          x2={130.26}
          y2={6.16525}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BA24ED" />
          <stop offset={1} stopColor="#01EBFA" />
        </linearGradient>
      </defs>
    </svg>
  );
};
export default SVGComponent;
