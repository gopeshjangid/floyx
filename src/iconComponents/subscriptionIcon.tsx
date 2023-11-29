import * as React from "react";
const SubscriptionIcon = (props:{fill: string, stroke: string}) => (
  <svg
    width={56}
    height={56}
    viewBox="0 0 56 56"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={56} height={56} rx={9} fill="#1B1830" />
    <rect
      x={0.5}
      y={0.5}
      width={55}
      height={55}
      rx={8.5}
      stroke="#fff"
      strokeOpacity={0.15}
    />
    <path
      d="M22.73 35.7c.82-.88 2.07-.81 2.79.15l1.01 1.35c.81 1.07 2.12 1.07 2.93 0l1.01-1.35c.72-.96 1.97-1.03 2.79-.15 1.78 1.9 3.23 1.27 3.23-1.39V23.04c.01-4.03-.93-5.04-4.71-5.04h-7.56c-3.78 0-4.72 1.01-4.72 5.04V34.3c0 2.67 1.46 3.29 3.23 1.4Z"
      stroke="url(#a)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 23h8"
      stroke="url(#b)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25 27h6"
      stroke="url(#c)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="a"
        x1={19.5}
        y1={38.002}
        x2={37.644}
        y2={37.075}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#AB59FF" />
        <stop offset={0.568} stopColor="#858FFF" />
        <stop offset={1} stopColor="#4D9AFF" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={24}
        y1={24}
        x2={30.952}
        y2={20.651}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#AB59FF" />
        <stop offset={0.568} stopColor="#858FFF" />
        <stop offset={1} stopColor="#4D9AFF" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={25}
        y1={28}
        x2={30.683}
        y2={25.947}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#AB59FF" />
        <stop offset={0.568} stopColor="#858FFF" />
        <stop offset={1} stopColor="#4D9AFF" />
      </linearGradient>
    </defs>
  </svg>
);
export default SubscriptionIcon;