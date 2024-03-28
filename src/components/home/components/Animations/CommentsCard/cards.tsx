"use client";
import React, { useEffect ,useRef} from "react";
import "./style.css";
import "./animation.css";
import styled from '@emotion/styled';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';




const MainContainer = styled.section`
height:989px;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
let CHECKED = false;
document.addEventListener("pointerdown", (e) => {
	CHECKED = !CHECKED;
  document.documentElement.style.setProperty("--light", CHECKED ? "1" : "0");
});
  const settings = {
    initialSlide:3,
    className: "center",
    arrows:false,
    autoplay:true,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 1,
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
      <div className="container">
    <aside className="carousel">
        <div className="carousel__wrapper">
            <div className="item" id="slide-0"><img src='/image0.png' alt="" width="418" height="418" /></div>
            <div className="item" id="slide-1"><img src='/image1.png' alt="" width="418" height="418" /></div>
            <div className="item" id="slide-2"><img src='/image2.png' alt="" width="418" height="418" /></div>
            <div className="item" id="slide-3"><img src='/image0.png' alt="" width="418" height="418" /></div>
            <div className="item" id="slide-4"><img src='/image1.png' alt="" width="418" height="418" /></div>
            <div className="item" id="slide-5"><img src='/image2.png' alt="" width="418" height="418" /></div>
            <div className="item" id="slide-6"><img src='/image0.png' alt="" width="418" height="418" /></div>
        </div>
    </aside>
    <article className="instagram">
        <header className="instagram__header">
            <figure><img src="https://assets.codepen.io/108082/jake-dog.png" alt="Jake Dog" width="42" height="42" />
                <figcaption>
                    <h4>Jake the Dog</h4>
                </figcaption>
            </figure>
        </header>
        <section className="instagram__media">
            <div className="img"></div>
        </section>
        <footer className="instagram__buttons">
            <div className="left"><svg className="instagram__icon instagram__icon--heart" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.8196 3.40477L16.8196 3.40468L16.8105 3.40435C15.9939 3.37401 15.1837 3.55848 14.4607 3.93934C13.7415 4.31818 13.1337 4.87813 12.6974 5.56376C12.3799 6.0141 12.1595 6.38237 12.0011 6.66645C11.841 6.38254 11.6182 6.01451 11.2971 5.5646C10.8588 4.88294 10.252 4.32584 9.53521 3.94728C8.81455 3.56666 8.00746 3.37954 7.19284 3.40423L7.19283 3.40408L7.18038 3.40477C5.73422 3.48471 4.37827 4.133 3.40801 5.20836C2.44041 6.28078 1.93462 7.69124 1.99999 9.13385C2.00344 10.8131 2.73878 12.1587 3.76066 13.3486C4.54375 14.2605 5.52952 15.1172 6.516 15.9745C6.80035 16.2216 7.08476 16.4688 7.36439 16.7173C7.71256 17.0283 8.0484 17.3289 8.36875 17.6156C9.03981 18.2163 9.64287 18.7561 10.1488 19.2024C10.8808 19.8482 11.4505 20.3358 11.7281 20.5156L11.9996 20.6915L12.2713 20.516C12.5291 20.3494 13.0097 19.9415 13.7041 19.3303C14.2257 18.8712 14.8883 18.2789 15.7018 17.5517C15.9935 17.2909 16.3047 17.0128 16.6357 16.7172C16.9253 16.4597 17.2205 16.2037 17.5157 15.9477C18.4876 15.105 19.4601 14.2617 20.2346 13.3628C21.2586 12.1744 21.9965 10.8264 22 9.13385C22.0653 7.69123 21.5596 6.28078 20.592 5.20836C19.6217 4.133 18.2657 3.48471 16.8196 3.40477ZM11.6142 4.35506L11.9954 4.80294L12.3761 4.35467C12.9155 3.71951 13.5913 3.21422 14.3531 2.87644C15.1144 2.53889 15.9419 2.37731 16.7742 2.40369C18.4866 2.47112 20.1027 3.21362 21.2694 4.46897C22.4364 5.72476 23.0588 7.39158 23.0003 9.10494L23 9.11347V9.122C23 12.4787 20.5608 14.6294 18.1924 16.6842C17.8966 16.94 17.598 17.2003 17.3031 17.462L17.3018 17.4632L16.3798 18.2872L16.3736 18.2927L16.3676 18.2985C15.2327 19.3827 14.0415 20.4065 12.7991 21.3656C12.5599 21.5162 12.2829 21.5962 12 21.5962C11.7171 21.5962 11.4402 21.5162 11.201 21.3657C9.9972 20.4352 8.84189 19.4436 7.73965 18.3948L7.73401 18.3894L7.7282 18.3842L6.7012 17.4662L6.70057 17.4657C6.43759 17.2314 6.17305 17.0015 5.91337 16.7758C5.88988 16.7554 5.86643 16.735 5.84303 16.7147C3.34442 14.5424 0.999982 12.4694 0.999982 9.122V9.11347L0.999691 9.10494C0.941196 7.39158 1.56352 5.72476 2.73058 4.46897C3.89709 3.21378 5.51295 2.47131 7.2251 2.40372C8.0557 2.37962 8.88112 2.54227 9.6405 2.87968C10.4006 3.21742 11.0751 3.72163 11.6142 4.35506Z"></path></svg>
                <svg
                    className="instagram__icon instagram__icon--comment" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20.656 17.008C21.8711 14.9061 22.2795 12.4337 21.8048 10.0527C21.3301 7.67172 20.0048 5.54497 18.0765 4.06978C16.1482 2.59458 13.7488 1.87186 11.3266 2.0366C8.9043 2.20135 6.62486 3.24231 4.91408 4.96501C3.20329 6.68772 2.17817 8.97432 2.03024 11.3977C1.8823 13.821 2.62166 16.2153 4.1102 18.1334C5.59874 20.0514 7.73463 21.3619 10.1189 21.82C12.5031 22.2782 14.9726 21.8527 17.066 20.623L22 22L20.656 17.008Z"></path>
                    </svg><svg className="instagram__icon instagram__icon--message" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 3 9.218 10.083M11.698 20.334 22 3.001H2L9.218 10.084 11.698 20.334Z"></path></svg></div>
            <div className="right"><svg className="instagram__icon instagram__icon--saved" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 21L12 13.44L4 21V3H20V21Z"></path></svg></div>
        </footer>
    </article>
</div>
      {/* <CarasoulContainer  >
        <div  className="slider-container">
          <Slider {...settings}>
              <div 
                   
                 
                >
                 <img className="sli-img"  src='/image0.png'/>
                </div>
            

 <div >
                 <img className="sli-img"  src='/image1.png'/>
                </div>
                 <div
                
                >
                 <img className="sli-img"   src='/image2.png'/>
                </div>

           


            
          </Slider>
        </div>
        
        

        
      </CarasoulContainer  > */}
    </MainContainer></>

  );
};
