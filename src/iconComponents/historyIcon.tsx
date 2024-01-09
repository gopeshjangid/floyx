import * as React from 'react';
const HistoryIcon = props => (
  <svg
    width={20}
    height={21}
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.333 10.5c0 4.6-3.734 8.333-8.334 8.333A8.336 8.336 0 0 1 1.666 10.5c0-4.6 3.733-8.333 8.333-8.333S18.333 5.9 18.333 10.5Z"
      stroke={props?.stroke ?? '#5798FF'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m13.091 13.15-2.583-1.542c-.45-.266-.817-.908-.817-1.433V6.758"
      stroke={props?.stroke ?? '#5798FF'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default HistoryIcon;
