"use client";
import type { NextPage } from "next";
import styled from '@emotion/styled'

const PodcastChild = styled.img`
  width: 1690.7px;
  height: 1734.1px;
  position: absolute;
  margin: 0 !important;
  top: -511px;
  left: -242px;
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
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
`;
const RecordContentConduct = styled.div`
  //align-self: stretch;
  position: relative;
  font-size: 18px;
  line-height: 27px;
  color: rgba(255, 255, 255, 0.7);
   @media screen and (max-width: 450px) {
    right: -25px;
  width: 360px;
  }
  
`;
const SignUpButton = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 23px 0px;
  z-index: 1;
  @media screen and (max-width: 1230px) {
    margin-top:-251px;
  }
`;
const Podcast = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 280px 500px;
  box-sizing: border-box;
  min-height: 816px;
  max-width: 100%;
  height: 100%;
  @media screen and (max-width: 800px) {
    padding-left: 250px;
    padding-right: 250px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 450px) {
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
`;
const UnionIcon = styled.img`
  height: 58px;
  width: 171px;
  position: relative;
   @media screen and (max-width:  450px) {
     left: 125px;
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
  align-self: stretch;
  height: 816px;
  position: relative;
  max-width: 100%;
  text-align: center;
  font-size: 50px;
  color: #fff;
  font-family: Poppins;
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
        <PodcastChild alt="" src="/group-338@2x.png" />
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
      </Podcast>
    </CenteredRectangleRoot>
  );
};

export default CenteredRectangle;
