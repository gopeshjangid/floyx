import * as React from 'react';
import { SVGProps } from 'react';
const SVGHelp = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
    <path
      d="M12.5 22.917c5.73 0 10.417-4.688 10.417-10.417 0-5.73-4.687-10.417-10.416-10.417-5.73 0-10.417 4.688-10.417 10.417 0 5.73 4.687 10.417 10.417 10.417Zm0-14.584v5.209"
      stroke="#fff"
      strokeOpacity={0.3}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12.494 16.667h.01" stroke="#fff" strokeOpacity={0.3} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export default SVGHelp;
