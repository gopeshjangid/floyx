"use client";
import React, { useMemo,useEffect,useState,useRef } from "react";
import { TypeAnimation } from 'react-type-animation';

export const TypingAnimation = () => {
  const [fontSize, setFontSize] = useState(50); // Default font size
  
   useEffect(() => {
    // Function to calculate and update font size based on viewport width
    function updateFontSize() {
       const viewportWidth = window.innerWidth;
      let newSize = 50; // Default font size
             if (viewportWidth < 400) {
         newSize = 30; // For smaller screens
      }
      setFontSize(newSize);
    }
     // Call the function initially and add event listener for resize
    updateFontSize();
    window.addEventListener('resize', updateFontSize);
//debugger
    // Cleanup function to remove event listener
         return () => {
       window.removeEventListener('resize', updateFontSize);
    };
  }, [window.innerWidth]); // Empty dependency array ensures the effect runs only once


    return (
         <div className="type-animation-parent"> 
         <div className="child-type">

       <TypeAnimation
         className="abs"
        sequence={[
          'Time for a Revolution in The\n Social Media Industry!',
        1000,
        ""
         
        ]}
        speed={20}
             style={{ whiteSpace: 'pre-line', fontSize: `${fontSize}px`, fontWeight: "700"}}
        repeat={Infinity}
      />
         </div>
      
      </div>
    )
};

