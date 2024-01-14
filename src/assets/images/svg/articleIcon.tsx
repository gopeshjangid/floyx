import * as React from 'react';
const ArticleProfileIcon = props => (
  <svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.25 6.417v9.166c0 2.75-1.375 4.584-4.583 4.584H7.333c-3.208 0-4.583-1.834-4.583-4.584V6.417c0-2.75 1.375-4.584 4.583-4.584h7.334c3.208 0 4.583 1.834 4.583 4.584Z"
      stroke={props.active ? '#A75FFF' : '#7C93AE'}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.291 4.125v1.833c0 1.009.825 1.834 1.834 1.834h1.833m-9.625 4.125H11m-3.667 3.666h7.334"
      stroke={props.active ? '#A75FFF' : '#7C93AE'}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ArticleProfileIcon;
