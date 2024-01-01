import * as React from 'react';
const VoteIcon = (props: any) => (
  <svg
    width={56}
    height={56}
    viewBox="0 0 56 56"
    fill={props?.fill}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} y={0.5} width={55} height={55} rx={8.5} fill={props.fill} />
    <rect
      x={0.5}
      y={0.5}
      width={55}
      height={55}
      rx={8.5}
      strokeWidth={'1px'}
      stroke={props.stroke}
    />
    <path
      d="M35.5 36.575H34.55C33.55 36.575 32.6 36.9625 31.9 37.6625L29.7625 39.775C28.7875 40.7375 27.2 40.7375 26.225 39.775L24.0875 37.6625C23.3875 36.9625 22.425 36.575 21.4375 36.575H20.5C18.425 36.575 16.75 34.9125 16.75 32.8625V19.225C16.75 17.175 18.425 15.5125 20.5 15.5125H35.5C37.575 15.5125 39.25 17.175 39.25 19.225V32.8625C39.25 34.9 37.575 36.575 35.5 36.575Z"
      stroke="url(#paint0_linear_307_10044)"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28.35 31.7C28.1625 31.7625 27.85 31.7625 27.65 31.7C26.025 31.1375 22.375 28.825 22.375 24.8875C22.375 23.15 23.775 21.75 25.5 21.75C26.525 21.75 27.425 22.2375 28 23C28.575 22.2375 29.475 21.75 30.5 21.75C32.225 21.75 33.625 23.15 33.625 24.8875C33.6125 28.825 29.975 31.1375 28.35 31.7Z"
      stroke="url(#paint1_linear_307_10044)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_307_10044"
        x1={16.75}
        y1={40.4969}
        x2={40.7706}
        y2={39.1942}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#AB59FF" />
        <stop offset={0.567907} stopColor="#858FFF" />
        <stop offset={1} stopColor="#4D9AFF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_307_10044"
        x1={22.375}
        y1={31.7469}
        x2={34.3656}
        y2={30.9344}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#AB59FF" />
        <stop offset={0.567907} stopColor="#858FFF" />
        <stop offset={1} stopColor="#4D9AFF" />
      </linearGradient>
    </defs>
  </svg>
);
export default VoteIcon;
