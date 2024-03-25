"use client";
import React, { useEffect ,useRef} from "react";
import "./style.css";
import "./animation.css";
import styled from '@emotion/styled';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';




const MainContainer = styled.section`
height:478px;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  // padding: 0px 556px 22px;
  box-sizing: border-box;
  gap: 58px 0px;
  max-width: 100%;
  text-align: left;
  font-size: 50px;
  color: #fff;
  font-family: Poppins;
  overflow:hidden;
  // @media screen and (max-width: 1350px) {
  //   padding-left: 278px;
  //   padding-right: 278px;
  //   box-sizing: border-box;
  // }
  // @media screen and (max-width: 800px) {
  //   gap: 29px 0px;
  //   padding-left: 139px;
  //   padding-right: 139px;
  //   box-sizing: border-box;
  // }
  // @media screen and (max-width: 450px) {
  //   padding-left: 20px;
  //   padding-right: 20px;
  //   box-sizing: border-box;
  // }
`;
const HeadingWrap = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 18px 0px;
`;
const HeadingContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px 0px 21px;
`;
const Heading = styled.b`
  position: relative;
  letter-spacing: 1px;
  line-height: 45px;
  text-transform: capitalize;
  z-index: 2;
  @media screen and (max-width: 800px) {
    font-size: 40px;
    line-height: 36px;
  }
  @media screen and (max-width: 450px) {
    font-size: 30px;
    line-height: 27px;
  }
`;
const SubHeading = styled.div`
  align-self: stretch;
  height: 47px;
  position: relative;
  font-size: 18px;
  line-height: 27px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  display: inline-block;
  flex-shrink: 0;
  z-index: 2;
  @media screen and (max-width: 450px) {
    margin:0px 20px;
  }
`;
const CarasoulContainer = styled.div`
  
  width: 100%;
  height: 526px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  object-fit: cover;
  max-width: 481%;
  z-index: 2;
`;
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const CommentsCards = () => {
  const ref =useRef(null)
  console.log("Changes appearing to local")
  useEffect(() => {
   const value =ref.current
   
    debugger
  }, [ref]);
  const settings = {
    className: "center",
    arrows:false,
    autoplay:true,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    
  };
  return (
    <> <MainContainer>
      <HeadingWrap>
        <HeadingContainer>
          <Heading>Posts</Heading>
        </HeadingContainer>
        <SubHeading>
          Create quick posts without worrying about the character limit!
        </SubHeading>
      </HeadingWrap>
      <CarasoulContainer  >
        <div ref={ref} className="slider-container">
          <Slider {...settings}>
              <div 
                   
                 
                >
                 <img className="sli-img" width="379" src='/image0.png'/>
                </div>
            

 <div >
                 <img className="sli-img" width="379" src='/image1.png'/>
                </div>
                 <div
                
                >
                 <img className="sli-img" width="379"  src='/image2.png'/>
                </div>

           


            
          </Slider>
        </div>
        
        {/* <div className="parent-div-1">
          <div className="posts-1-151107 pos-abs" id="id-03215">
            <div className="frame-427320742-1-97812 pos-abs" id="id-I03215_933077">
              <div
                className="frame-427320707-1-134178 pos-abs"
                id="id-I03215_932941"
              >
                <div
                  className="nodeBg-I03215_932941 pos-abs image-div bg-no-repeat  bg-crop"
                  id="id-bg-I03215_932941"
                >
                  {" "}
                </div>
              </div>
              <div className="feed-1-1-1-489500 pos-abs" id="id-I03215_932942">
                <div
                  className="nodeBg-I03215_932942 pos-abs image-div bg-no-repeat  bg-crop"
                  id="id-bg-I03215_932942"
                >
                  {" "}
                </div>
              </div>
              <div
                className="frame-427320707-1-806478 pos-abs"
                id="id-I03215_932943"
              >
                <div
                  className="nodeBg-I03215_932943 pos-abs image-div bg-no-repeat  bg-crop"
                  id="id-bg-I03215_932943"
                >
                  {" "}
                </div>
              </div>
              <div
                className="frame-427320707-1-360552 pos-abs"
                id="id-I03215_933053"
              >
                <div
                  className="nodeBg-I03215_933053 pos-abs image-div bg-no-repeat fill-parent bg-cover"
                  id="id-bg-I03215_933053"
                >
                  {" "}
                </div>
              </div>
              <div className="feed-1-3-1-2276 pos-abs" id="id-I03215_933054">
                <div
                  className="nodeBg-I03215_933054 pos-abs image-div bg-no-repeat  bg-crop"
                  id="id-bg-I03215_933054"
                >
                  {" "}
                </div>
              </div>
              <div
                className="frame-427320707-1-60514 pos-abs"
                id="id-I03215_933055"
              >
                <div
                  className="nodeBg-I03215_933055 pos-abs image-div bg-no-repeat  bg-crop"
                  id="id-bg-I03215_933055"
                >
                  {" "}
                </div>
              </div>
              <div
                className="frame-427320707-1-90650 pos-abs"
                id="id-I03215_933059"
              >
                <div
                  className="nodeBg-I03215_933059 pos-abs image-div bg-no-repeat fill-parent bg-cover"
                  id="id-bg-I03215_933059"
                >
                  {" "}
                </div>
              </div>
              <div className="feed-1-4-1-544553 pos-abs" id="id-I03215_933060">
                <div
                  className="nodeBg-I03215_933060 pos-abs image-div bg-no-repeat  bg-crop"
                  id="id-bg-I03215_933060"
                >
                  {" "}
                </div>
              </div>
              <div
                className="frame-427320707-1-903438 pos-abs"
                id="id-I03215_933061"
              >
                <div
                  className="nodeBg-I03215_933061 pos-abs image-div bg-no-repeat  bg-crop"
                  id="id-bg-I03215_933061"
                >
                  {" "}
                </div>
              </div> 
             </div>
          </div>
        </div> */}

        
      </CarasoulContainer  >
    </MainContainer></>

  );
};
