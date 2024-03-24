import { Box, Button } from "@mui/material";
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from "react";

const GradientBg = styled.div`
  position: absolute;
  top: 56px;
  // left: 197px;
  background: linear-gradient(
    90.16deg,
    #080617,
    rgba(8, 6, 23, 0.76) 64.5%,
    rgba(8, 6, 23, 0)
  );
  width: 100%;
  height: 638px;
  z-index: 1;
`;
const GradientItems = styled.div`
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
const GradientInner = styled.div`
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
const BackgroundWrapper = styled.div`
  position: relative;
  height: 100%;
  top: 0px;
  bottom: 0px;
  width: 100%;
  flex: 25%;
  padding: 20px;
  @media screen and (max-width: 992px) {
  
    top:840px;
  
}
`;
const Heading1 = styled.b`
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
    font-size: 35px;
    line-height: 36px;
    text-align:left;
  }
`;
const Heading2 = styled.div`
  align-self: stretch;
  position: relative;
  font-size: 16px;
  line-height: 27px;
  color: rgba(255, 255, 255, 0.7);
  text-align: left;
`;
const HeadingContainer = styled.div`
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
const SubHeadings = styled.p`
  margin: 0;
`;
const TextContainer = styled.div`
  height: 216px;
  position: relative;
  font-size: 16px;
  line-height: 27px;
  color: #b5b4b9;
  text-align: left;
  display: inline-block;
`;
const FrameInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px 0px;
  max-width: 100%;
`;
const ButtonStyled = styled(Button)`
  width: 246px;
  height: 48px;
  @media screen and (max-width: 440px) {
    margin-top: 140px;
  }
`;
const FrameOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px 0px;
  max-width: 100%;
  @media screen and (max-width: 440px) {
    height: 660px;
  }
`;
const SocialMediaText = styled.div`
  position: relative;
  line-height: 27px;
`;
const SocialMediaIcon = styled.img`
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
const SocialMediaContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;
const SocialMediaOutterContainer = styled.div`
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
const InnerContainer = styled.div`
 flex: 25%;
  padding: 20px;
width:730px;
  position: absolute;
  top: 130px;
  left: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px 0px;
  max-width: 100%;
  z-index: 3;
  flex: 25%;
  padding: 20px;
  @media screen and (max-width: 992px) {
  width:100%;
    flex: 50%;
    left: 0px;
}
`;
const BgDecors = styled.div`
  position: absolute;
  top: 165.5px;
  left: 994.5px;
  box-shadow: 0px 0px 17px #9d5ef3;
  border-top: 5px solid rgba(166, 98, 255, 0.07);
  box-sizing: border-box;
  width: 81px;
  height: 5px;
  z-index: 3;
`;
const MainContainer = styled.section`
display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 777px;
  position: relative;
  margin: 0 !important;
  right: -51px;
  max-width: 100%;
  text-align: center;
  font-size: 50px;
  color: #fff;
  font-family: Poppins;
  @media screen and (max-width: 992px) {
   height:1322px;
  flex-direction: column;
  }
  @media screen and (max-width: 442px) {
    right: 0px;
   }
`;

const AboutUs = () => {
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
      document?.querySelector("#imgPeople")?.classList.add("fade-in-image");
    }
    else {
      document?.querySelector("#imgPeople")?.classList.remove("fade-in-image");
    };

  }, [isIntersecting]);

  const joinNowClick = ()=>{
    window.location.href="/register";
  }
  return (
    <MainContainer ref={ref}>
      <InnerContainer>
        <FrameOuterContainer>
          <FrameInnerContainer>
            <HeadingContainer>
              <Heading1>About Us</Heading1>
              <Heading2>We are on a mission to create a secure and uncensored digital space, driven by creators and accessible to millions of people around the world.</Heading2>
            </HeadingContainer>
            <TextContainer>
              <SubHeadings>You won't find EX founders from Google, Meta, Linkedin here.</SubHeadings>
              <SubHeadings>You won't find here big Venture Capitals, Angel Investors who value money above freedom.</SubHeadings>
              <SubHeadings>You won't read about us in Forbes, Bloomberg, The New York Times etc.</SubHeadings>
              <SubHeadings>&nbsp;</SubHeadings>
              <SubHeadings>Instead, you will find people like you who work hard for you every day and believe in a censorship-free and safe haven for every internet user.</SubHeadings>
              <SubHeadings>{` `}</SubHeadings>
              <SubHeadings>Be with us and join Floyx today.</SubHeadings>
            </TextContainer>
          </FrameInnerContainer>
          <ButtonStyled
            disableElevation={true}
            variant="contained"
            onClick={joinNowClick}
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
          </ButtonStyled>
        </FrameOuterContainer>
        <SocialMediaOutterContainer>
          <SocialMediaText>Connect with Floyx:</SocialMediaText>
          <SocialMediaContainer>
            <SocialMediaIcon loading="lazy" alt="" src="/twitteralt-2.svg" />
            <SocialMediaIcon loading="lazy" alt="" src="/instagram-1.svg" />
            <YoutubeIcon loading="lazy" alt="" src="/youtube.svg" />
            <SocialMediaIcon loading="lazy" alt="" src="/tiktok.svg" />
            <SocialMediaIcon loading="lazy" alt="" src="/facebook-1.svg" />
            <SocialMediaIcon alt="" src="/envelope-1.svg" />
          </SocialMediaContainer>
        </SocialMediaOutterContainer>
      </InnerContainer>
      <BackgroundWrapper>
        <GradientBg >
      <img id="imgPeople" className="fadeInImg" src="/people.png" />
        </GradientBg>
        <GradientItems />
        <GradientInner />
      </BackgroundWrapper>
    </MainContainer>
  );
};

export default AboutUs;
