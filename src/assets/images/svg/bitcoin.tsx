import * as React from 'react';
const BitCoin = props => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 8.38074H13.6846C14.7231 8.38074 15.5654 9.31535 15.5654 10.2615C15.5654 11.3 14.7231 12.1423 13.6846 12.1423H9V8.38074Z" 
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 12.1307H14.3539C15.5423 12.1307 16.5 12.973 16.5 14.0115C16.5 15.05 15.5423 15.8923 14.3539 15.8923H9V12.1307Z" 
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.2773 15.8809V17.7616" 
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.93457 15.8809V17.7616" 
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.2773 6.5V8.38077" 
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.93457 6.5V8.38077" 
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.7769 8.38074H7.5" 
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.7769 15.8809H7.5" 
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke={props?.color ?? "#5798FF"}
      strokeWidth="1.5"
      strokeMiterlimit="10"
    />

  </svg>
);

export default BitCoin;
