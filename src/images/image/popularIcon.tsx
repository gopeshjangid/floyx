import * as React from 'react';

const PopularIcon = (props: any) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.1499 7.5C12.1499 7.5 11.9999 8.25 9.74993 11.25C7.57493 14.1 10.7249 16.2 11.0999 16.5H11.1749C11.6249 16.125 17.3249 12.525 12.1499 7.5Z"
        stroke={props.fill}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3501 5.84999C10.3501 4.12499 9.6751 2.54999 9.0001 1.64999C8.7751 1.42499 8.4001 1.49999 8.3251 1.79999C8.0251 2.92499 7.1251 5.32499 4.9501 8.17499C2.1751 11.775 4.7251 15.675 7.3501 16.425C8.7751 16.8 6.9751 15.675 6.7501 13.35C6.5251 10.425 10.3501 8.24999 10.3501 5.84999Z"
        stroke={props.fill}      
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PopularIcon;
