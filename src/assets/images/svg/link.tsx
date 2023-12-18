import * as React from 'react';
const LinkIcon = props => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.0638 10.9399C15.3138 13.1899 15.3138 16.8299 13.0638 19.0699C10.8138 21.3099 7.17375 21.3199 4.93375 19.0699C2.69375 16.8199 2.68375 13.1799 4.93375 10.9399"
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5948 13.41C8.25484 11.07 8.25484 7.27001 10.5948 4.92001C12.9348 2.57001 16.7348 2.58001 19.0848 4.92001C21.4348 7.26001 21.4248 11.06 19.0848 13.41"
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round" />
  </svg>
);
export default LinkIcon;
