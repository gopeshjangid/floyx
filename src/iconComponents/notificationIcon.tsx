import * as React from 'react';
const SVGComponent = props => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.0206 2.91003C8.71058 2.91003 6.02058 5.60003 6.02058 8.91003V11.8C6.02058 12.41 5.76058 13.34 5.45058 13.86L4.30058 15.77C3.59058 16.95 4.08058 18.26 5.38058 18.7C9.69058 20.14 14.3406 20.14 18.6506 18.7C19.8606 18.3 20.3906 16.87 19.7306 15.77L18.5806 13.86C18.2806 13.34 18.0206 12.41 18.0206 11.8V8.91003C18.0206 5.61003 15.3206 2.91003 12.0206 2.91003Z"
      stroke={props.stroke}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <path
      d="M13.8699 3.19994C13.5599 3.10994 13.2399 3.03994 12.9099 2.99994C11.9499 2.87994 11.0299 2.94994 10.1699 3.19994C10.4599 2.45994 11.1799 1.93994 12.0199 1.93994C12.8599 1.93994 13.5799 2.45994 13.8699 3.19994Z"
      stroke={props.stroke}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.0195 19.0601C15.0195 20.7101 13.6695 22.0601 12.0195 22.0601C11.1995 22.0601 10.4395 21.7201 9.89953 21.1801C9.35953 20.6401 9.01953 19.8801 9.01953 19.0601"
      stroke={props.stroke}
      strokeWidth={1.5}
      strokeMiterlimit={10}
    />
  </svg>
);
export default SVGComponent;
