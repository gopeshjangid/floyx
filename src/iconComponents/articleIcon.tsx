import * as React from "react";
const ArticleIcon = (props) => (
  <svg
    width={56}
    height={56}
    viewBox="0 0 56 56"
    fill={props?.fill}
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
      stroke="white"
      strokeOpacity={0.15}
    />
    <path
      d="M22.73 35.7C23.55 34.82 24.8 34.89 25.52 35.85L26.53 37.2C27.34 38.27 28.65 38.27 29.46 37.2L30.47 35.85C31.19 34.89 32.44 34.82 33.26 35.7C35.04 37.6 36.49 36.97 36.49 34.31V23.04C36.5 19.01 35.56 18 31.78 18H24.22C20.44 18 19.5 19.01 19.5 23.04V34.3C19.5 36.97 20.96 37.59 22.73 35.7Z"
      stroke="url(#paint0_linear_868_8103)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 23H32"
      stroke="url(#paint1_linear_868_8103)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25 27H31"
      stroke="url(#paint2_linear_868_8103)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_868_8103"
        x1={19.5}
        y1={38.0025}
        x2={37.6442}
        y2={37.0745}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#AB59FF" />
        <stop offset={0.567907} stopColor="#858FFF" />
        <stop offset={1} stopColor="#4D9AFF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_868_8103"
        x1={24}
        y1={24}
        x2={30.9524}
        y2={20.6508}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#AB59FF" />
        <stop offset={0.567907} stopColor="#858FFF" />
        <stop offset={1} stopColor="#4D9AFF" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_868_8103"
        x1={25}
        y1={28}
        x2={30.6825}
        y2={25.9469}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#AB59FF" />
        <stop offset={0.567907} stopColor="#858FFF" />
        <stop offset={1} stopColor="#4D9AFF" />
      </linearGradient>
    </defs>
  </svg>
);
export default ArticleIcon;