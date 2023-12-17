import React from 'react';

const VideoIcon = props => (
  <svg
    width={27}
    height={24}
    viewBox="0 0 27 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M14.1002 20.42H6.99016C3.43516 20.42 2.25391 18.32 2.25391 16.21V7.78996C2.25391 4.62996 3.43516 3.57996 6.99016 3.57996H14.1002C17.6552 3.57996 18.8364 4.62996 18.8364 7.78996V16.21C18.8364 19.37 17.6439 20.42 14.1002 20.42Z"
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round" />
    <path d="M21.9634 17.1L18.8359 15.15V8.84001L21.9634 6.89001C23.4934 5.94001 24.7534 6.52001 24.7534 8.19001V15.81C24.7534 17.48 23.4934 18.06 21.9634 17.1Z"
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round" />
    <path
      d="M12.9414 11C13.8734 11 14.6289 10.3284 14.6289 9.5C14.6289 8.67157 13.8734 8 12.9414 8C12.0094 8 11.2539 8.67157 11.2539 9.5C11.2539 10.3284 12.0094 11 12.9414 11Z"
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


export default VideoIcon;
