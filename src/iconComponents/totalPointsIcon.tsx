import * as React from 'react';
const TotalPpintsIcon = props => (
  <svg
    width={44}
    height={44}
    viewBox="0 0 27 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      width={69}
      height={59}
      rx={1}
      ry={1}
      fill={props.fill ? props.fill : '#0B081F'}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m16.8 7.969-1.41-2.82c-.77-1.53-2.01-1.53-2.78-.01l-1.41 2.82c-.19.39-.7.77-1.13.84l-2.55.42c-1.63.28-2.01 1.46-.84 2.63l1.99 1.99c.33.33.52.98.43 1.46l-.57 2.46c-.45 1.94.59 2.69 2.3 1.68l2.39-1.42c.43-.26 1.15-.26 1.58 0l2.39 1.42c1.71 1.02 2.75.26 2.3-1.68l-.57-2.46c-.11-.47.08-1.12.41-1.45l1.99-1.99c1.17-1.18.79-2.36-.84-2.63l-2.55-.42c-.43-.08-.94-.45-1.13-.84ZM2 5.75h6c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H2c-.41 0-.75.34-.75.75s.34.75.75.75Zm3 14H2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3c.41 0 .75.34.75.75s-.34.75-.75.75Zm-3-7h1c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H2c-.41 0-.75.34-.75.75s.34.75.75.75Z"
      fill="url(#a)"
    />
    <defs>
      <linearGradient
        id="a"
        x1={1.25}
        y1={19.892}
        x2={23.33}
        y2={18.157}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#AB59FF" />
        <stop offset={0.568} stopColor="#858FFF" />
        <stop offset={1} stopColor="#4D9AFF" />
      </linearGradient>
    </defs>
  </svg>
);
export default TotalPpintsIcon;
