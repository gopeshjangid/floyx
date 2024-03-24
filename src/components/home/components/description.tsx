import type { NextPage } from "next";
import { Button } from "@mui/material";
import styled from '@emotion/styled'
import React, { useState, useEffect, useRef } from "react"
import { AnimateText } from "./Animations/Header/animateText";
import Link from "next/link";


const Heading = styled.div`
  flex: 1;
  position: relative;
  line-height: 24px;
  display: inline-block;
  max-width: 100%;
  z-index: 3;
`;
const HeadingContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 7px;
  box-sizing: border-box;
  max-width: 100%;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
`;
const DetailsInnerContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 26px 0px;
  max-width: 100%;
  padding-top: 100px;
`;

const Bttn = styled(Button)`
  height: 48px;
  flex: 1;
  z-index: 1;
`;
const ButtonContainer = styled.div`
  width: 166px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 11px 0px 0px;
  box-sizing: border-box;
  z-index: 3;
   @media screen and (max-width: 425px) {
    width:100%;
     
   
  }
`;
const Subheader = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
`;
const DetailsContainer = styled.div`
  width: 1009px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 23px 0px;
  max-width: 100%;
`;

const Image = styled.img`
 
  width: 100%;
  object-fit: contain;
  position: absolute;
  left: 0px;
  top: 0px;
  transform: scale(1.029);
`;
const ImgWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  margin: 0 !important;
  top: 0px;
  left: 0px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
`;
const ImageLeftContainer = styled.div`
  height: 689px;
  flex: 1;
  position: relative;
  min-width: 269px;
  max-width: 100%;
  z-index: 1;
  @media screen and (max-width: 975px) {
    display:none
  }
`;
const ImageCenterContainer = styled.div`
  height: 689px;
  width: 399px;
  position: relative;
  transform: rotate(180deg);
  max-width: 100%;
  z-index: 1;
  
`;
const ImageRightContainer = styled.div`
  align-self: stretch;
  height: 689px;
  position: relative;
  z-index: 1;
   @media screen and (max-width: 975px) {
    display:none
  }
`;
const Image1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1px 0px 0px;
  box-sizing: border-box;
  min-width: 269px;
  max-width: 100%;
`;
const AnimatedInnerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  row-gap: 20px;
  max-width: 100%;
  flex-shrink: 0;
`;
const AnimatedPostContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 0px 0px;
  box-sizing: border-box;
  max-width: 100%;
  z-index: 2;
   @media screen and (max-width: 975px) {
    height:400px;
    margin-top:23px;
  }
  @media screen and (max-width: 618px) {
    height:235px;
    margin-top:23px;
  }
  
`;
const InnerContainer = styled.div`
 
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 61px 0px;
  max-width: 100%;
  @media screen and (max-width: 800px) {
    gap: 30px 0px;
  }
  @media screen and (max-width: 450px) {
    gap: 15px 0px;
  }
`;
const MainContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
  box-sizing: border-box;
  max-width: 100%;
  flex-shrink: 0;
  text-align: center;
  font-size: 59px;
  color: #fff;
  font-family: Poppins;
`;

const Description = () => {
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

  let left = document.getElementById("left");

  left?.addEventListener("mouseover", leftIn, false);
  left?.addEventListener("mouseout", leftOut, false);

  function leftIn() {
    document?.querySelector("#postPhoto")?.classList.add("left-hover");
  }

  function leftOut() { document?.querySelector("#postPhoto")?.classList.remove("left-hover"); }

  let right = document.getElementById("right");

  right?.addEventListener("mouseover", rightIn);
  right?.addEventListener("mouseout", rightOut);

  function rightIn() {
    document?.querySelector("#postPhoto")?.classList.add("right-hover");
  }
  function rightOut() { document?.querySelector("#postPhoto")?.classList.remove("right-hover"); }
  useEffect(() => {

    if (isIntersecting) {
      //document?.querySelector("#postPhoto")?.classList.add("zoom-in-out-box");
    }
    else {
      document?.querySelector("#postPhoto")?.classList.remove("zoom-in-out-box");

    };


  }, [isIntersecting]);
  return (
    <MainContainer ref={ref}>
      <InnerContainer>
        <DetailsContainer>
          <DetailsInnerContainer>
            <HeadingContainer>
              <Heading>
                Floyx is a decentralized social media platform whose main task
                is to take care of the digital security of all users in the
                world! Publish censorship-resistant content with innovative
                forms of monetization and stay in touch with everyone through
              </Heading>
            </HeadingContainer>
          </DetailsInnerContainer>
          <Subheader>
            <ButtonContainer>
              <Bttn
                disableElevation={true}
                variant="contained"
                href="/register"
                LinkComponent={Link}
                sx={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 99999,
                  textTransform: "none",
                  color: "#100d26",
                  fontSize: "16",
                  background:
                    "linear-gradient(86.55deg, #ab59ff, #858fff 56.79%, #4d9aff)",
                  borderRadius: "4px",
                  "&:hover": {
                    background:
                      "linear-gradient(86.55deg, #ab59ff, #858fff 56.79%, #4d9aff)",
                  },
                  height: 48,
                }}
              >
                Get Started
              </Bttn>
            </ButtonContainer>
          </Subheader>
        </DetailsContainer>

        <AnimatedPostContainer >
          <AnimatedInnerContainer id="postPhoto" className="" >
            <ImgWrapper >
              <Image loading="lazy" alt="" src="/desktop--1-1@2x.png" />
            </ImgWrapper >
            <ImageLeftContainer id="left" className="" />
            <ImageCenterContainer />
            <Image1  >
              <ImageRightContainer className="" id="right" />
            </Image1>
          </AnimatedInnerContainer>
        </AnimatedPostContainer>
      </InnerContainer>
    </MainContainer>
  );
};

export default Description;
