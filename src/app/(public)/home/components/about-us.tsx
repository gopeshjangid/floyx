import type { NextPage } from "next";
import { Button } from "@mui/material";
import styled from '@emotion/styled' ;
import React, { useEffect, useRef, useState } from "react";


const Icon1 = styled.img`
  position: absolute;
  top: 34px;
  left: 240px;
  width: 784px;
  height: 682px;
  object-fit: cover;
`;
const FrameChild = styled.div`
  position: absolute;
  top: 56px;
  left: 197px;
  background: linear-gradient(
    90.16deg,
    #080617,
    rgba(8, 6, 23, 0.76) 64.5%,
    rgba(8, 6, 23, 0)
  );
  width: 376px;
  height: 638px;
  z-index: 1;
`;
const FrameItem = styled.div`
  position: absolute;
  top: 777px;
  left: 197px;
  background: linear-gradient(
    90.16deg,
    #080617,
    rgba(8, 6, 23, 0.76) 64.5%,
    rgba(8, 6, 23, 0)
  );
  width: 230px;
  height: 776px;
  transform: rotate(-90deg);
  transform-origin: 0 0;
  z-index: 2;
`;
const FrameInner = styled.div`
  position: absolute;
  top: 0px;
  left: 19px;
  background: linear-gradient(
    90.16deg,
    #080617,
    rgba(8, 6, 23, 0.76) 64.5%,
    rgba(8, 6, 23, 0)
  );
  width: 230px;
  height: 954px;
  transform: rotate(90deg);
  transform-origin: 0 0;
  z-index: 2;
`;
const Parent1 = styled.div`
  position: absolute;
  height: 100%;
  top: 0px;
  bottom: 0px;
  left: 326px;
  width: 1024px;
`;
const AboutUs1 = styled.b`
  width: 224px;
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
const WeAreOn = styled.div`
  align-self: stretch;
  position: relative;
  font-size: 16px;
  line-height: 27px;
  color: rgba(255, 255, 255, 0.7);
  text-align: left;
`;
const AboutUsParent = styled.div`
  width: 685px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px 0px 0px;
  box-sizing: border-box;
  gap: 23px 0px;
  max-width: 100%;
`;
const YouWontFind = styled.p`
  margin: 0;
`;
const YouWontFindContainer = styled.div`
  height: 216px;
  position: relative;
  font-size: 16px;
  line-height: 27px;
  color: #b5b4b9;
  text-align: left;
  display: inline-block;
`;
const FrameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px 0px;
  max-width: 100%;
`;
const FrameButton = styled(Button)`
  width: 246px;
  height: 48px;
`;
const FrameGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px 0px;
  max-width: 100%;
`;
const ConnectWithFloyx = styled.div`
  position: relative;
  line-height: 27px;
`;
const TwitterAlt2Icon = styled.img`
  height: 23px;
  width: 23px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
`;
const YoutubeIcon = styled.img`
  height: 31px;
  width: 30px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
`;
const TwitterAlt2Parent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;
const ConnectWithFloyxParent = styled.div`
  width: 270px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 20px 0px 0px;
  box-sizing: border-box;
  gap: 17px 0px;
  text-align: left;
  font-size: 16px;
  color: rgba(181, 180, 185, 0.65);
`;
const FrameParent = styled.div`
  position: absolute;
  top: 130px;
  left: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px 0px;
  max-width: 100%;
  z-index: 3;
`;
const AboutUsChild = styled.div`
  position: absolute;
  top: 165.5px;
  left: 886.5px;
  box-shadow: 0px 0px 17px #9d5ef3;
  border-top: 5px solid rgba(166, 98, 255, 0.07);
  box-sizing: border-box;
  width: 81px;
  height: 5px;
  z-index: 3;
`;
const AboutUsRoot = styled.section`
  width: 1350px;
  height: 777px;
  position: absolute;
  margin: 0 !important;
  right: -51px;
  bottom: 323px;
  max-width: 100%;
  text-align: center;
  font-size: 50px;
  color: #fff;
  font-family: Poppins;
`;

const AboutUs: NextPage = () => {
   const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-300px" }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting) {
      document.querySelector("#imgPeople").classList.add("fade-in-image");
    }
    else {
      document.querySelector("#imgPeople").classList.remove("fade-in-image");
    };

  }, [isIntersecting]);
  return (
    <AboutUsRoot ref={ref}>
      <Parent1>
        {/* <Icon1 loading="lazy" alt="" src="/2151003744-1@2x.png" /> */}

        <FrameChild />
        <FrameItem />
        <FrameInner />
      </Parent1>
      <FrameParent>
        <FrameGroup>
          <FrameContainer>
            <AboutUsParent>
              <AboutUs1>About Us</AboutUs1>
              <WeAreOn>{`We are on a mission to create a secure and uncensored digital space, driven by creators and accessible to millions of people around the world. `}</WeAreOn>
            </AboutUsParent>
            <YouWontFindContainer>
              <YouWontFind>{`You won't find EX founders from Google, Meta, Linkedin here. `}</YouWontFind>
              <YouWontFind>{`You won't find here big Venture Capitals, Angel Investors who value money above freedom. `}</YouWontFind>
              <YouWontFind>{`You won't read about us in Forbes, Bloomberg, The New York Times etc. `}</YouWontFind>
              <YouWontFind>&nbsp;</YouWontFind>
              <YouWontFind>{`Instead, you will find people like you who work hard for you every day and believe in a censorship-free and safe haven for every internet user. `}</YouWontFind>
              <YouWontFind>{` `}</YouWontFind>
              <YouWontFind>Be with us and join Floyx today.</YouWontFind>
            </YouWontFindContainer>
          </FrameContainer>
          <FrameButton
            disableElevation={true}
            variant="contained"
            sx={{
              textTransform: "none",
              color: "#0b081f",
              fontSize: "16",
              background:
                "linear-gradient(86.55deg, #ab59ff, #858fff 56.79%, #4d9aff)",
              borderRadius: "5px",
              "&:hover": {
                background:
                  "linear-gradient(86.55deg, #ab59ff, #858fff 56.79%, #4d9aff)",
              },
              width: 246,
              height: 48,
            }}
          >
            Join now
          </FrameButton>
        </FrameGroup>
        <ConnectWithFloyxParent>
          <ConnectWithFloyx>Connect with Floyx:</ConnectWithFloyx>
          <TwitterAlt2Parent>
            <TwitterAlt2Icon loading="lazy" alt="" src="/twitteralt-2.svg" />
            <TwitterAlt2Icon loading="lazy" alt="" src="/instagram-1.svg" />
            <YoutubeIcon loading="lazy" alt="" src="/youtube.svg" />
            <TwitterAlt2Icon loading="lazy" alt="" src="/tiktok.svg" />
            <TwitterAlt2Icon loading="lazy" alt="" src="/facebook-1.svg" />
            <TwitterAlt2Icon alt="" src="/envelope-1.svg" />
          </TwitterAlt2Parent>
        </ConnectWithFloyxParent>
      </FrameParent>
      <AboutUsChild />
      <img id="imgPeople" className="fadeInImg" src="/people.png" />
    </AboutUsRoot>
  );
};

export default AboutUs;
