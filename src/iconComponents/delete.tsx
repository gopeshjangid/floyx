import * as React from 'react';
import { SVGProps } from 'react';
const SVGDelete = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
    <path
      d="M22.75 6.478a110.177 110.177 0 0 0-10.855-.541c-2.145 0-4.29.108-6.435.325l-2.21.216m5.959-1.094.238-1.419c.174-1.03.304-1.798 2.135-1.798h2.838c1.83 0 1.972.812 2.134 1.809l.238 1.408m3.63 4.518-.704 10.909c-.12 1.7-.217 3.022-3.24 3.022H9.523c-3.022 0-3.12-1.321-3.239-3.022L5.58 9.9m5.611 7.975H14.8m-4.509-4.333h5.417"
      stroke={props?.stroke ?? "#F15C5C"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGDelete;
