import type { NextPage } from "next";
import { Button } from "@mui/material";
import styled from '@emotion/styled'
import React, { useState, useEffect, useRef } from "react"
import { AnimateText } from "./Animations/Header/animateText";

const T = styled.span``;
const ImeForA = styled.span`
  color: rgba(0, 0, 0, 0);
`;
const TimeForAContainer = styled.b`
  height: 138px;
  flex: 1;
  position: relative;
  letter-spacing: 0.68px;
  line-height: 69px;
  display: inline-block;
  opacity: 0;
  max-width: 100%;
  @media screen and (max-width: 800px) {
    font-size: 47px;
    line-height: 55px;
  }
  @media screen and (max-width: 450px) {
    font-size: 35px;
    line-height: 41px;
  }
`;
const T1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 3;
`;
const I = styled.span`
  color: #fff;
`;
const I1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 4;
`;
const M = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 5;
`;
const E = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 6;
`;
const Div = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 7;
`;
const F = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 8;
`;
const O = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 9;
`;
const R = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 10;
`;
const ErrMsgsGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 11;
`;
const A = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 12;
`;
const LoginFormInput = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 13;
`;
const R1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 14;
`;
const E1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 15;
`;
const V = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 16;
`;
const O1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 17;
`;
const L = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 18;
`;
const U = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 19;
`;
const T2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 20;
`;
const I2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 21;
`;
const O2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 22;
`;
const N = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 23;
`;
const PostsSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 24;
`;
const I3 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 25;
`;
const N1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 26;
`;
const HeaderGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 27;
`;
const T3 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 28;
`;
const H = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 29;
`;
const E2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 30;
`;
const PasswordError = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 31;
`;
const S = styled.span`
  background: linear-gradient(93.15deg, #ab59ff, #858fff 56.79%, #4d9aff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const S1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 32;
`;
const O3 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 33;
`;
const C = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 34;
`;
const I4 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 35;
`;
const A1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 36;
`;
const L1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 37;
`;
const Div1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 38;
`;
const M1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 39;
`;
const E3 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 40;
`;
const D = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 41;
`;
const I5 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 42;
`;
const A2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 43;
`;
const PasswordInputLabel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 44;
`;
const I6 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 45;
`;
const N2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 46;
`;
const D1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 47;
`;
const U1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 48;
`;
const S2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 49;
`;
const T4 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 50;
`;
const R2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 51;
`;
const Y = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 52;
`;
const Div2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 53;
  margin-left: -1009px;
`;
const YParent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  margin-left: -1009px;
`;
const IParent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  margin-left: -1009px;
  color: rgba(0, 0, 0, 0);
`;
const Border = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
`;
const FloyxIsA = styled.div`
  flex: 1;
  position: relative;
  line-height: 24px;
  display: inline-block;
  max-width: 100%;
  z-index: 3;
`;
const PlaceholderTextNode = styled.div`
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
const TermsAgreementTextFrame = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 26px 0px;
  max-width: 100%;
`;
const HeroScreenAnimationChild = styled.div`
  height: 59px;
  width: 166px;
  position: relative;
  background-color: rgba(217, 217, 217, 0);
  display: none;
`;
const Bttn = styled(Button)`
  height: 48px;
  flex: 1;
  z-index: 1;
`;
const HeroScreenAnimation = styled.div`
  width: 166px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 11px 0px 0px;
  box-sizing: border-box;
  z-index: 3;
`;
const Subheader = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
`;
const TermsAgreementTextFrameParent = styled.div`
  width: 1009px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 23px 0px;
  max-width: 100%;
`;
const PasswordInputLabelFrame = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
  box-sizing: border-box;
  max-width: 100%;
`;
const Desktop = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  position: absolute;
  left: 0px;
  top: 0px;
  transform: scale(1.029);
`;
const WrapperDesktop = styled.div`
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
const DesktopRectangle = styled.div`
  height: 689px;
  flex: 1;
  position: relative;
  min-width: 269px;
  max-width: 100%;
  z-index: 1;
`;
const DesktopRectangle1 = styled.div`
  height: 689px;
  width: 399px;
  position: relative;
  transform: rotate(180deg);
  max-width: 100%;
  z-index: 1;
`;
const DesktopRectangle2 = styled.div`
  align-self: stretch;
  height: 689px;
  position: relative;
  z-index: 1;
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
const WrapperDesktop11Parent = styled.div`
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
const HeroNewScreenAnimation = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 0px 0px;
  box-sizing: border-box;
  max-width: 100%;
  z-index: 2;
`;
const InputFieldContainerRectangl = styled.div`
  width: 1226.8px;
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
const EmailInputLabelFrameRoot = styled.div`
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

const EmailInputLabelFrame: NextPage = () => {
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

 let left = document.getElementById("left");

left?.addEventListener("mouseover", leftIn, false);
left?.addEventListener("mouseout", leftOut, false);

function leftIn()
{   document.querySelector("#postPhoto").classList.add("left-hover");
 console.log(left,document.querySelector("#postPhoto").classList,"llllllllllllll")}


function leftOut()
{  document.querySelector("#postPhoto").classList.remove("left-hover");}

  let right = document.getElementById("right");
 
  right?.addEventListener("mouseover", rightIn);
  right?.addEventListener("mouseout", rightOut);

  function rightIn() { document.querySelector("#postPhoto").classList.add("right-hover");

 console.log(right,document.querySelector("#postPhoto").classList,"rrrrrrrrrrrrrrrr")}

  function rightOut() { document.querySelector("#postPhoto").classList.remove("right-hover"); }
  useEffect(() => {

    if (isIntersecting) {
      document.querySelector("#postPhoto").classList.add("zoom-in-out-box");
      // document.querySelector("#id-I03221_1366701").classList.add("object");
      // item.addEventListener("mouseout", func1, false);
    }
    else {
      document.querySelector("#postPhoto").classList.remove("zoom-in-out-box");

    };


  }, [isIntersecting]);
  return (
    <EmailInputLabelFrameRoot ref={ref}>
      {/* <AnimateText className="abc"/> */}
      <InputFieldContainerRectangl>
        <TermsAgreementTextFrameParent>
          <TermsAgreementTextFrame>

            <PlaceholderTextNode>
              <FloyxIsA>
                Floyx is a decentralized social media platform whose main task
                is to take care of the digital security of all users in the
                world! Publish censorship-resistant content with innovative
                forms of monetization and stay in touch with everyone through
              </FloyxIsA>
            </PlaceholderTextNode>
          </TermsAgreementTextFrame>
          <Subheader>
            <HeroScreenAnimation>
              <HeroScreenAnimationChild />
              <Bttn
                disableElevation={true}
                variant="contained"
                sx={{
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
            </HeroScreenAnimation>
          </Subheader>
        </TermsAgreementTextFrameParent>
        {/* <PasswordInputLabelFrame>
        </PasswordInputLabelFrame> */}
        <HeroNewScreenAnimation >
          <WrapperDesktop11Parent id="postPhoto" className="" >
            <WrapperDesktop >
              <Desktop loading="lazy" alt="" src="/desktop--1-1@2x.png" />
            </WrapperDesktop >
            <DesktopRectangle id="left" className="" />
            <DesktopRectangle1 className="2s" />
            <Image1  >
              <DesktopRectangle2 className="" id="right" />
            </Image1>
          </WrapperDesktop11Parent>
        </HeroNewScreenAnimation>
      </InputFieldContainerRectangl>
    </EmailInputLabelFrameRoot>
  );
};

export default EmailInputLabelFrame;
