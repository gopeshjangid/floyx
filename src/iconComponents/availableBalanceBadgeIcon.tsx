import * as React from "react";
const AvailableBalanceicon = (props) => (
  <svg
    width={176}
    height={45}
    viewBox="0 0 76 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect y={3} width={39} height={39} rx={10} fill="#fff" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.48 25.92A6.495 6.495 0 0 0 30 19.5a6.5 6.5 0 0 0-6.5-6.5c-3.26 0-5.95 2.4-6.42 5.52h.03c3.91.31 7.06 3.46 7.37 7.34v.06Zm-7.46-5.9A6.509 6.509 0 0 1 23 26.5a6.5 6.5 0 1 1-5.98-6.48ZM16.5 29l.88-1.62L19 26.5l-1.62-.88L16.5 24l-.88 1.62-1.62.88 1.62.88.88 1.62Z"
      fill="url(#a)"
    />
    <defs>
      <linearGradient
        id="a"
        x1={10}
        y1={33}
        x2={31.337}
        y2={31.715}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#AB59FF" />
        <stop offset={0.568} stopColor="#858FFF" />
        <stop offset={1} stopColor="#4D9AFF" />
      </linearGradient>
    </defs>
  </svg>
);
export default AvailableBalanceicon;