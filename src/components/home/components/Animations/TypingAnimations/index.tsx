"use client";
import React, { useMemo,useEffect,useState,useRef } from "react";
import { TypeAnimation } from 'react-type-animation';
import useDevice from "@/lib/hooks/useDevice";
export const TypingAnimation = () => {
  const { isMobile } = useDevice();
  const ref =useRef<HTMLDivElement>(null)
   useEffect(() => {
     const value = ref?.current
     if (isMobile && ref.current){
   
       ref.current.style.fontSize = "30px"
  }
else if (ref.current) {
 ref.current.style.fontSize = "58px"
}
  }, [isMobile,ref]); // Empty dependency array ensures the effect runs only once


    return (
         <div className="type-animation-parent"> 
         <div className="child-type abs">

       <TypeAnimation
       ref={ref}       
        sequence={[
          'Time for a Revolution in Then Social Media Industry!',
        1000,
        ""
         
        ]}
        speed={20}
        style={{whiteSpace: 'pre-line', fontSize: '58px', fontWeight: "700",width:"1009px"}}
        repeat={Infinity}
      />
         </div>
      
      </div>
    )
};

