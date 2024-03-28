"use client"
import type { NextPage } from "next";
import { Button } from "@mui/material";
import styled from '@emotion/styled';
import React, { useState, useEffect, useRef } from 'react'
const FrameChild = styled.div`
  align-self: stretch;
  width: 1px;
  position: relative;
  border-right: 1px solid rgba(255, 255, 255, 0.04);
  box-sizing: border-box;
  display: none;
  // @media screen and (max-width: 450px) {
  //   margin: 25px;  
  // }
`;
const SocialFiMarketplace = styled.div`
  height: 1064px;
  width: 1px;
  position: relative;
  border-right: 1px solid rgba(255, 255, 255, 0.04);
  box-sizing: border-box;
  @media screen and (max-width: 800px) {
    width: 100%;
    height: 1px; 
  }
  @media screen and (max-width: 430px) {
    height: 900px;
   }
`;
const SocialFiMarketplace1 = styled.div`
  height: 1064px;
  width: 1px;
  position: relative;
  border-right: 1px solid rgba(255, 255, 255, 0);
  box-sizing: border-box;
  @media screen and (max-width: 800px) {
    width: 100%;
    height: 1px;
  }
`;
const SocialFiMarketplace2 = styled.div`
  height: 1064px;
  width: 1px;
  position: relative;
  border-right: 1px solid rgba(38, 36, 51, 0);
  box-sizing: border-box;
`;
const LineParent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0px 0px 0px 56px;
  gap: 20px;
`;
const UsernameInput = styled.div`
  align-self: stretch;
  height: 1px;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  box-sizing: border-box;
`;
const UsernameInput1 = styled.div`
  align-self: stretch;
  height: 1px;
  position: relative;
  border-top: 1px solid rgba(38, 36, 51, 0.29);
  box-sizing: border-box;
`;
const UsernameInputParent = styled.div`
  height: 1064px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 56px 0px;
  max-width: 100%;
  z-index: 1;
  @media screen and (max-width: 800px) {
    gap: 28px 0px;
  }
`;
const FrameWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 8px;
  box-sizing: border-box;
  max-width: 100%;
  margin-top: -1064px;
`;
const FrameParent = styled.div`
  width: 100%;
  margin: 0 !important;
  position: absolute;
  height: 100%;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
`;
const FrameItem = styled.div`
  height: 1px;
  width: 76px;
  position: relative;
  border-top: 1px solid rgba(166, 98, 255, 0);
  box-sizing: border-box;
`;
const ShineBackgroundInner = styled.div`
  width: 404px;
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 20px 0px;
  box-sizing: border-box;
  max-width: 100%;
`;
const FrameInner = styled.div`
  align-self: stretch;
  width: 1px;
  position: relative;
  border-right: 1px solid rgba(66, 133, 244, 0);
  box-sizing: border-box;
  z-index: 2;
`;
const ShineBackgroundChild = styled.div`
  align-self: stretch;
  height: 76px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  // padding: 0px 1112px 0px 0px;
  box-sizing: border-box;
`;
const FrameDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 29px 262px 0px;
`;
const FrameChild1 = styled.div`
  height: 1px;
  width: 76px;
  position: relative;
  border-top: 1px solid rgba(166, 98, 255, 0);
  box-sizing: border-box;
  z-index: 2;
`;
const ShineBackgroundInner1 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 138px 0px;
`;
const FrameChild2 = styled.div`
  align-self: stretch;
  width: 1px;
  position: relative;
  border-right: 1px solid rgba(166, 98, 255, 0);
  box-sizing: border-box;
  z-index: 2;
`;
const FrameChild3 = styled.div`
  align-self: stretch;
  height: 1px;
  position: relative;
  border-top: 1px solid rgba(166, 98, 255, 0);
  box-sizing: border-box;
  z-index: 2;
`;

const LineWrapper = styled.div`
  height: 32px;
  width: 76px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 32px;
  box-sizing: border-box;
`;
const LineGroup = styled.div`
  width: 253px;
  height: 76px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
`;
const ShineBackground = styled.div`
//  margin-top:25px;
  width: 100%;
  // height: 1064px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // padding: 0px 82px 24px 74px;
  box-sizing: border-box;
  position: relative;
  gap: 98px 0px;
  max-width: 162%;
  flex-shrink: 0;
  // @media screen and (max-width: 450px) {
  //   max-height: 800px;
  // }
  // @media screen and (max-width: 380px) {
  //   max-height: 950px;
  // }
`;
const FloyxMarketplace = styled.div`
  width: 100%;
  position: relative;
  letter-spacing: -0.01em;
  line-height: 120%;
  font-weight: 600;
  background: linear-gradient(86.55deg, #ab59ff, #858fff 56.79%, #4d9aff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  @media screen and (max-width: 450px) {
    font-size: 23px;
    line-height: 28px;
  }
`;
const FloyxMarketplaceWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
  
`;
const HaveYouHeard = styled.p`
  margin: 0;
  //  @media screen and (max-width: 450px) {
  //  margin:15px;
   
  // }
`;
const WordSection=styled.p`
  margin: 0;
   @media screen and (max-width: 5120px) {
   margin:15px;
   
  }
`;
const HaveYouHeardContainer = styled.div`
  align-self: stretch;
  position: relative;
  font-size: 16px;
  line-height: 27px;
  display: inline-block;
  flex-shrink: 0;
  // @media screen and (max-width: 380px) {
  //    margin-bottom: 50px;
  //   height: 700px;
  // }
`;
const FrameGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 33px 0px;
  max-width: 100%;
  // @media screen and (max-width: 450px) {
  //   gap: 16px 0px;
  // }
`;
const EcoSystemInner = styled.div`
height:329px;
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
 
  box-sizing: border-box;
  max-width: 100%;
`;
const FrameButton = styled(Button)`
  align-self: stretch;
  height: 48px;
   @media screen and (max-width: 512px) {
   
   margin-top: 5rem;
   
  }
`;
const EllipseDiv = styled.div`
  height: 12px;
  width: 12px;
  position: relative;
  border-radius: 50%;
  background-color: #4285f4;
`;
const TextInput = styled.div`
  width: 9px;
  height: 9px;
  position: relative;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.37);
`;
const TextFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1.5px 0px 0px;
`;
const EllipseParent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 10px;
`;
const FrameWrapper1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 77px;
  
`;
const FrameContainer = styled.div`
  width: 224px;
  // height: 100rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 34px 0px;
`;
const LandingPage = styled.img`
  align-self: stretch;
  position: relative;
  max-width: 100%;
  overflow: hidden;
  flex-shrink: 0;
  object-fit: cover;
  //   @media screen and (max-width: 450px) {
  //   margin:20px;
  // }
`;
const EcoSystem = styled.div`
  width:866px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px 0px;
  max-width: 100%;
  z-index: 3;
  margin-top: -1014px;
  @media screen and (max-width: 800px) {
    width: 100%;
    
  }
`;
const MainContainer = styled.div`
display:flex;

  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  box-sizing: border-box;
  max-width: 100%;
  text-align: center;
  font-size: 29px;
  color: rgba(255, 255, 255, 0.7);
  font-family: Poppins;
  // @media screen and (max-width: 430px) {
  //   position:relative;
  //   top: -90px;
  //  }
`;


const TextContainer = styled.div`
  display:flex;
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  box-sizing: border-box;
  max-width: 100%;
`;
const TextOuterContainer = styled.div`
  width: 866px;
  height: 412px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 23px 0px;
  max-width: 100%;
  
`;
const TextInnerContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
`;
const HeadingContainer = styled.b`
  width: 182px;
  position: relative;
  letter-spacing: -0.02em;
  line-height: 120%;
  display: inline-block;
  z-index: 2;
  font-family: Poppins;
font-size: 50px;
font-weight: 700;
line-height: 60px;
letter-spacing: -0.02em;
text-align: center;
color:white;
  @media screen and (max-width: 800px) {
    font-size: 40px;
    line-height: 48px;
  }
  @media screen and (max-width: 450px) {
    font-size: 30px;
    line-height: 36px;
    
  }
`;
const SubHeadingContainer = styled.div`
  align-self: stretch;
  position: relative;
  font-size: 18px;
  line-height: 27px;
  color: rgba(255, 255, 255, 0.7);
  z-index: 1;
  @media screen and (max-width: 450px) {
    // font-size: 30px;
    // line-height: 36px;
    // margin:20px;
  }
`;
const FrameComponent: NextPage = () => {
  const [value, setValue] = useState({
    index: 0,
    heading: "Floyx Marketplace", title: "Have you heard of NFT? Are you a talented graphic designer, painter, musician, photographer or just want to try your hand at this art? Check out our modern and innovative Marketplace, which allows you to monetize your artwork, as well as profit from each subsequent sale through a loyalty system. ", subTitle: "Are you a beginner? No problem! Floyx has created tools that will allow you to create your first NFT collection completely free of charge!", img: "/landing-page-2@2x.png"
  })
  const data = [
    {
      heading: "Floyx Marketplace", title: "Have you heard of NFT? Are you a talented graphic designer, painter, musician, photographer or just want to try your hand at this art? Check out our modern and innovative Marketplace, which allows you to monetize your artwork, as well as profit from each subsequent sale through a loyalty system. ", subTitle: "Are you a beginner? No problem! Floyx has created tools that will allow you to create your first NFT collection completely free of charge!", img: "/landing-page-2@2x.png"
    },
    { heading: "Floyx Launchpad", title: "Are you interested in the cryptocurrency industry? Do you have an innovative idea? Maybe you already have a working project but don't know how you should get started and how to raise capital for further development and marketing? You know perfectly well that without connections, contacts and a big name you will not be able to interest VCs, Angel Investors, big funds in your project? We know this problem! ", subTitle: "hat's why we built Launchpad - which allows you to show up to investors and raise capital in a safe and decentralized way! ", img: "/title2j.png" },
    { heading: "Floyx Airdrops", title: "Are you a beginner in the cryptocurrency space? Maybe you are an advanced project that wants to expand its reach and attract many thousands or millions of active users to your product?  We have created a full token distribution machine within airdrops, in a tasks system where users will face your tasks starting from the easy ones to the most complicated ones! ", subTitle: "This is the perfect tool for people who spend long hours every day searching for the best airdrops to earn extra cryptocurrencies. A fair and automatic distribution method, based on the achieved results in a point system - this is what you are looking for! ", img: "/title3js.png" },
    {
      heading: "Decentralized Floyx Exchange", title: "If you have taken advantage of the entire Floyx ecosystem dedicated to the cryptocurrency industry and blockchain projects - it's time for your first listing! ", subTitle: "Floyx offers the safest trading option available in today's market. Connect your wallet, trade cryptocurrencies and receive them directly to your wallet - without any centralized intermediaries!", img: "/title4js.png"
    }]
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-100px" }
    );

    if (ref?.current) { observer.observe(ref.current); }

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {

    if (isIntersecting) {
      let newValue
      if (data[value.index + 1]) {
        newValue = { ...data[value.index + 1], index: value.index + 1 }
      } else {
        newValue = { ...data[0], index: 0 }

      }


      const interval = setInterval(() => {
        setValue(newValue);
      }, 3000);

      return () => clearInterval(interval);

    }
    else {

    };

  }, [isIntersecting, value]);

  return (
    <MainContainer ref={ref}>

      <ShineBackground>
        <FrameParent>
          <LineParent>
            <FrameChild />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace1 />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace2 />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
          </LineParent>
          <FrameWrapper>
            <UsernameInputParent>
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput1 />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
            </UsernameInputParent>
          </FrameWrapper>
        </FrameParent>
        <ShineBackgroundInner>
          <FrameItem />
        </ShineBackgroundInner>
        <ShineBackgroundChild>
          <FrameInner />
        </ShineBackgroundChild>
        <FrameDiv>
          <FrameInner />
        </FrameDiv>
        <ShineBackgroundInner1>
          <FrameChild1 />
        </ShineBackgroundInner1>
        <LineGroup>
          <FrameChild2 />
          <LineWrapper>
            <FrameChild3 />
          </LineWrapper>
        </LineGroup>
      <EcoSystem>
        <EcoSystemInner>
          <FrameGroup>
            <FloyxMarketplaceWrapper>
              <FloyxMarketplace>{value.heading}</FloyxMarketplace>
            </FloyxMarketplaceWrapper>
            <HaveYouHeardContainer>
              <HaveYouHeard>{value.title}</HaveYouHeard>
              <HaveYouHeard>&nbsp;</HaveYouHeard>
              <HaveYouHeard>
                {value.subTitle}
              </HaveYouHeard>
            </HaveYouHeardContainer>
          </FrameGroup>
        </EcoSystemInner>
        <FloyxMarketplaceWrapper>
          <FrameContainer>
            <FrameButton
              disableElevation={true}
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#0b081f",
                fontSize: "16",
                background:
                  "linear-gradient(86.55deg, #ab59ff, #858fff 56.79%, #4d9aff)",
                borderRadius: "10px",
                "&:hover": {
                  background:
                    "linear-gradient(86.55deg, #ab59ff, #858fff 56.79%, #4d9aff)",
                },
                height: 48,
              }}
            >
              Coming Soon
            </FrameButton>
            <FrameWrapper1>
              {<EllipseParent>

                {data.map((item, index) => <TextFrame onClick={() => { setValue({ ...item, index: index }) }}>
                  <TextInput className={(value.heading == item.heading)?"active-pointer":""} />
                </TextFrame>)}

              </EllipseParent>}
            </FrameWrapper1>
          </FrameContainer>
        </FloyxMarketplaceWrapper>
        <LandingPage loading="lazy" alt="" src={value.img} />
      </EcoSystem>
      </ShineBackground>
    </MainContainer>
  );
};

export default FrameComponent;
