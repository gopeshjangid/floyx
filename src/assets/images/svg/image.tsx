import React from 'react';

const ImageIcon = props => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M10.0039 22H16.0039C21.0039 22 23.0039 20 23.0039 15V9C23.0039 4 21.0039 2 16.0039 2H10.0039C5.00391 2 3.00391 4 3.00391 9V15C3.00391 20 5.00391 22 10.0039 22Z"
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round" />
    <path d="M10.0039 10C11.1085 10 12.0039 9.10457 12.0039 8C12.0039 6.89543 11.1085 6 10.0039 6C8.89934 6 8.00391 6.89543 8.00391 8C8.00391 9.10457 8.89934 10 10.0039 10Z"
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round" />
    <path d="M3.67578 18.9501L8.60578 15.6401C9.39578 15.1101 10.5358 15.1701 11.2458 15.7801L11.5758 16.0701C12.3558 16.7401 13.6158 16.7401 14.3958 16.0701L18.5558 12.5001C19.3358 11.8301 20.5958 11.8301 21.3758 12.5001L23.0058 13.9001"
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round" />
  </svg>

);


export default ImageIcon;
