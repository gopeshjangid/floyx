"use client";
import type { NextPage } from "next";
import styled from '@emotion/styled'

const PodcastChild = styled.div`
 
  margin: 0 !important;
 background-image: url("/group-338@2x.png");
  object-fit: contain;
`;
const Scribble = styled.div`
  width: 608px;
  height: 608px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  display: none;
  max-width: 100%;
  z-index: 0;
`;
const HomeIcon = styled.img`
  width: 507.6px;
  height: 860.2px;
  position: absolute;
  margin: 0 !important;
  bottom: -444.5px;
  left: -80.1px;
  border-radius: 39.79px;
  object-fit: contain;
  z-index: 1;
`;
const SparkleIcon = styled.img`
  width: 171.5px;
  height: 171.5px;
  position: absolute;
  margin: 0 !important;
  top: 96.3px;
  left: 68px;
  overflow: hidden;
  flex-shrink: 0;
  object-fit: contain;
  z-index: 1;
  @media screen and (max-width: 797px) {
    display:none
  }
`;
const SparkleIcon1 = styled.img`
  width: 87.4px;
  height: 87.4px;
  position: absolute;
  margin: 0 !important;
  top: 99px;
  left: 209.7px;
  overflow: hidden;
  flex-shrink: 0;
  object-fit: contain;
  z-index: 2;
   @media screen and (max-width: 797px) {
    display:none
  }
`;
const SparkleIcon2 = styled.img`
  width: 35.8px;
  height: 35.4px;
  position: absolute;
  margin: 0 !important;
  top: 74px;
  left: 195.7px;
  overflow: hidden;
  flex-shrink: 0;
  object-fit: contain;
  z-index: 3;
   @media screen and (max-width: 797px) {
    display:none
  }
`;
const PlayIcon = styled.img`
  width: 569.3px;
  height: 876.7px;
  position: absolute;
  margin: 0 !important;
  right: -200.3px;
  bottom: -140.7px;
  border-radius: 39.79px;
  object-fit: contain;
  z-index: 0;
   @media screen and (max-width: 425px) {
    // display:none
  }
`;
const Podcasts = styled.b`
  width: 231px;
  position: relative;
  letter-spacing: -0.02em;
  line-height: 120%;
  display: inline-block;
  @media screen and (max-width: 800px) {
    font-size: 40px;
    line-height: 48px;
  }
  @media screen and (max-width: 450px) {
    font-size: 30px;
    line-height: 36px;
  }
`;
const AccessKeyField = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const RecordContentConduct = styled.div`
  font-size: 18px;
  line-height: 27px;
  color: rgba(255, 255, 255, 0.7);
  width:440px;
   @media screen and (max-width: 460px) {
    
  width: 100%;
  }
  
`;
const SignUpButton = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 23px 0px;
  z-index: 1;
  @media screen and (max-width: 1230px) {
position: relative;
    top: -344px;  }
`;
const Podcast = styled.div`
  
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 100%;
  
`;
const UnionIcon = styled.img`
  height: 58px;
  width: 171px;
  position: relative;
  // top: 40%;
  // left: 35%;
   @media screen and (max-width:  450px) {
  //      height: 58px;
  // width: 50%;
  // position: relative;
  // top: 40%;
  // left: 35%;
  }
  @media screen and (min-width:  1150px) {
 }
 @media screen and (min-width:  1400px) {
}
  
`;
const PodcastVoiceLines = styled.button`
  cursor: pointer;
  border: none;
  padding: 0;
  background-color: transparent;
  position: absolute;
  top: 484px;
  left: 629px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 4;
`;
const CenteredRectangleRoot = styled.section`
  height:954px;
  position: relative;
  max-width: 100%;
  text-align: center;
  font-size: 50px;
  color: #fff;
  font-family: Poppins;
  width: 100%;
  overflow: hidden;
`;
import React, { useEffect, useRef, useState } from "react";

const CenteredRectangle: NextPage = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-300px" }
    );

    if (ref?.current) { observer.observe(ref.current); }

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting) {
      document?.querySelector("#overBox")?.classList.add("vertical-shake");
      document?.querySelector("#mobBox")?.classList.add("horizontal-shake");
      document?.querySelector("#overBoxLeft")?.classList.add("vertical-shake-left");
      document?.querySelector("#mobBoxLeft")?.classList.add("horizontal-shake");
    }
    else {
      document?.querySelector("#overBox")?.classList?.remove("vertical-shake");
      document?.querySelector("#mobBox")?.classList?.remove("horizontal-shake");
      document?.querySelector("#overBoxLeft")?.classList?.remove("vertical-shake");
      document?.querySelector("#mobBoxLeft")?.classList?.remove("horizontal-shake");
      // document?.querySelector("#id-I03221_1366730")?.classList.remove("object");
      // document?.querySelector("#id-I03221_1366701")?.classList.remove("object");
    };

  }, [isIntersecting]);
  return (
    <CenteredRectangleRoot ref={ref}>
      <Podcast>
        <PodcastChild >
        <Scribble />
        
         <div id="Next2" className="leftWrapper"> <img  id="overBoxLeft"className="image-box-download-left" src="/threeBox.png" />
        <HomeIcon id="mobBoxLeft" className="qwerty" loading="lazy" alt="" src="/left-mob-img.png" /></div>
        
        <SparkleIcon alt="" src="/sparkle@2x.png" />
        <SparkleIcon1 loading="lazy" alt="" src="/sparkle-1@2x.png" />
        <SparkleIcon2 alt="" src="/sparkle-2@2x.png" />
        <div className="rightWrapper">

        <img id="overBox" className="image-box-download" src="play-1frame.png" />
        <PlayIcon id="mobBox" className="qwerty" loading="lazy" alt="" src="/play-1.png" />
        </div>
        <SignUpButton>
          <AccessKeyField>
            <Podcasts>Podcasts</Podcasts>
          </AccessKeyField>
          <RecordContentConduct>Record content, conduct interesting interviews and let yourself be found by millions of listeners around the world!</RecordContentConduct>
        <UnionIcon alt="" src="playMusic.gif" />
      {/* <PodcastVoiceLines>
      </PodcastVoiceLines> */}
        </SignUpButton>
        </PodcastChild>
      </Podcast>
    </CenteredRectangleRoot>
  );
};

export default CenteredRectangle;
