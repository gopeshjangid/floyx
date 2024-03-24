import React, { useEffect,useState,useRef } from "react";
import { TypeAnimation } from 'react-type-animation';
export const TypingAnimation = () => {
  
    return (
         <div className="type-animation-parent"> 
         <div className="child-type">

         <TypeAnimation
        sequence={[
          'Time for a Revolution in The\n Social Media Industry!',
        1000,
        ""
         
        ]}
        speed={20}
            style={{ whiteSpace: 'pre-line', fontSize: '50px', fontWeight: "700"}}
        repeat={Infinity}
      />
         </div>
      
      </div>
    );
};

// "",          1000,          "",