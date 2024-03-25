"use client";
import { Button } from "@mui/material";
import styled from '@emotion/styled'
import React, { useState, useEffect, useRef } from "react"

import Link from "next/link";
import { CompanyAboutInfo } from "./companyAbout";



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
  align-items: center;
  justify-content: center;
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
  height: 807px;
  flex: 1;
  position: relative;
  min-width: 500px;
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
height:100%;
width:500px;
  align-self: stretch;
  height: 689px;
  position: relative;
  z-index: 1;
   @media screen and (max-width: 975px) {
    display:none
  }
`;
const Image1 = styled.div`
height:807px;
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
  align-items: center;
  justify-content: center;
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
      { rootMargin: "-1px" }
    );

    if (ref?.current) { observer.observe(ref.current); }

    return () => observer.disconnect();
  }, [isIntersecting]);



  let left = document.getElementById("left");



  function leftIn() {
    document?.querySelector("#postPhoto")?.classList?.remove("left-hover-out");
    document?.querySelector("#postPhoto")?.classList?.remove("right-hover-out")
    document?.querySelector("#postPhoto")?.classList?.remove("right-hover")

    document?.querySelector("#postPhoto")?.classList.add("left-hover");
  }

  function leftOut() { document?.querySelector("#postPhoto")?.classList?.remove("left-hover");

  document?.querySelector("#postPhoto")?.classList.add("left-hover-out")

}
left?.addEventListener("mouseover", leftIn, false);
  left?.addEventListener("mouseout", leftOut, false);

  let right = document.getElementById("right");



  function rightIn() {
    document?.querySelector("#postPhoto")?.classList?.remove("right-hover-out")
    document?.querySelector("#postPhoto")?.classList.add("right-hover");
  }
  function rightOut() { document?.querySelector("#postPhoto")?.classList?.remove("right-hover");
     document?.querySelector("#postPhoto")?.classList.add("right-hover-out") }

  right?.addEventListener("mouseover", rightIn);
  right?.addEventListener("mouseout", rightOut);
  useEffect(() => {

    if (isIntersecting) {
      document?.querySelector("#stickyBtn")?.classList?.add("display-show")
      console.log("in")
      //dconsooleocument?.querySelector("#postPhoto")?.classList.add("zoom-in-out-box");
    }
    else {
      document?.querySelector("#stickyBtn")?.classList?.remove("display-show");
     

    };



  }, [isIntersecting]);
  return (
    <MainContainer >

      <InnerContainer>
        <DetailsContainer>
          <DetailsInnerContainer>
            <CompanyAboutInfo/>
          </DetailsInnerContainer>
          <Subheader>
            <ButtonContainer ref={ref}>
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
            <ImgWrapper  >
              <Image loading="lazy" alt="" src="/desktop--1-1@2x.png" />
            </ImgWrapper >
            <ImageLeftContainer id="left" className="" />
            <ImageCenterContainer />
            <Image1 >
              <ImageRightContainer className="" id="right" />
            </Image1>
          </AnimatedInnerContainer>
        </AnimatedPostContainer>
        <div ></div>
      </InnerContainer>
    </MainContainer>
  );
};

export default Description;
