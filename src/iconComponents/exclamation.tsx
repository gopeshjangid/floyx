import * as React from 'react';
import { SVGProps } from 'react';
const SVGExclamation = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={19} viewBox="0 0 18 19" fill="none" {...props}>
    <path
      d="M9 17c4.125 0 7.5-3.375 7.5-7.5S13.125 2 9 2 1.5 5.375 1.5 9.5 4.875 17 9 17ZM9 6.5v3.75"
      stroke="#D9D9D9"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8.996 12.5h.007" stroke="#D9D9D9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export default SVGExclamation;
