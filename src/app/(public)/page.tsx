"use client";
import { CommentsCards } from '../../components/home/components/Animations/CommentsCard/cards';
import AboutUs from '../../components/home/components/AboutUs';
import styled from '@emotion/styled';
import NavBar from '../../components/home/components/navBar';
import Description from '../../components/home/components/description';
import ArticleContainer from '../../components/home/components/articleContainer';
import PodCastsContainer from '../../components/home/components/podcastContainer';
import ChatContainer from '../../components/home/components/chatContainer';
import Group from '../../components/home/components/formLayout';
import DownloadApp from '../../components/home/components/downloadNow';
import MarketPlaceContainer from '../../components/home/components/MarketPlace';
import UniverseComponent from '../../components/home/components/universeConatainer';
import RegisterContainer from '../../components/home/components/registerContainer';
import Footer from '../../components/home/components/frame-groups';
import { TypingAnimation } from '../../components/home/components/Animations/TypingAnimations';
import VideoContainer from '../../components/home/components/videoContainer';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Suspense } from 'react';
import { Typography } from '@mui/material';

const MainContainerBg1 = styled.img`
  width: 1717.6px;
  height: 1606.5px;
  position: absolute;
  margin: 0 !important;
  bottom: 4013.5px;
  left: -166px;
  object-fit: contain;
`;

const LinkImage = styled.img`
  z-index: 34;
  filter: brightness(62%);
  position: absolute;
  top: 1258.5px;
  left: -225px;
  width: 700.8px;
  height: 871.5px;
  object-fit: contain;

  transform: scaleX(-1);
`;
const LinkItemImage = styled.img`
  position: absolute;
  top: 0px;
  left: -78px;
  width: 1690.7px;
  height: 1734.1px;
  object-fit: contain;
  z-index: 1;
`;
const ImageWrapper = styled.section`
  width: 100%;
  height: 2336px;
  position: absolute;
  margin: 0 !important;
  top: 27px;
  right: 0px;
  left: 0px;
`;
const ClippedIcon = styled.img`
  width: 372.6px;
  height: 4654px;
  position: relative;
  display: none;
  max-width: 100%;
  z-index: 4;
`;
const GapingContainer = styled.div`
  width: 270.5px;
  height: 594.3px;
  position: relative;
  border-radius: 50%;
  background-color: #ffad0e;
  filter: blur(280.69px);
  display: none;
  z-index: 5;
`;
const GradiantContainerBg = styled.div`
  width: 270.5px;
  height: 594.3px;
  position: relative;
  border-radius: 50%;
  background-color: rgba(255, 173, 14, 0.69);
  filter: blur(280.69px);
  display: none;
  z-index: 6;
`;
const FrameContainerBg = styled.div`
  width: 561px;
  display: none;
  max-width: 100%;
  z-index: 7;
`;
const BoxContainerBg = styled.div`
  width: 628px;
  height: 110.6px;
  position: relative;
  border-radius: 10px;
  background-color: #0b081f;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-sizing: border-box;
  display: none;
  max-width: 100%;
  z-index: 8;
`;
const GradiantContainerBg2 = styled.div`
  width: 311px;
  height: 35px;
  position: relative;
  background: linear-gradient(
    90deg,
    rgba(164, 98, 255, 0.4),
    rgba(138, 135, 255, 0.4) 54.69%,
    rgba(93, 150, 255, 0.4)
  );
  filter: blur(30px);
  display: none;
  z-index: 9;
`;
const NavBarContainer = styled.section`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  max-width: 100%;
  // @media screen and (max-width: 800px) {
  //   gap: 22px 0px;
  // }
`;

const MainContainer = styled.div`
  width: 100%;
  position: relative;
  background-color: #080617;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 89px 0px;
  letter-spacing: normal;
  text-align: center;
  font-size: 50px;
  color: #fff;
  font-family: Poppins;
  @media screen and (max-width: 800px) {
    gap: 44px 0px;
  }
  @media screen and (max-width: 450px) {
    gap: 22px 0px;
  }
`;

const Home = () => {
  return (
    <MainContainer>
      {/* <MainContainerBg1 alt="" src="/group-342@2x.png" /> */}
      {/* <MainContainerBg2 alt="" src="/group-340@2x.png" /> */}
      {/* <ImageWrapper>
        <LinkImage alt="" src="/gradientBg.png" />
        <LinkItemImage alt="" src="/group-338@2x.png" />
      </ImageWrapper> */}
      <ClippedIcon alt="" src="/clipped.svg" />
      <GapingContainer />
      <GradiantContainerBg />
      <FrameContainerBg />
      <BoxContainerBg />
      <GradiantContainerBg2 />
      <NavBarContainer>
        <NavBar />
        <TypingAnimation />
        <Description />
      </NavBarContainer>
      <CommentsCards />
      <ArticleContainer />
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <VideoContainer />
      </Suspense>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <PodCastsContainer />
      </Suspense>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <ChatContainer />
      </Suspense>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <Group />
      </Suspense>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <DownloadApp />
      </Suspense>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <UniverseComponent />
      </Suspense>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <MarketPlaceContainer />
      </Suspense>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        {' '}
        <RegisterContainer />
      </Suspense>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <AboutUs />
      </Suspense>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <Footer />
      </Suspense>
    </MainContainer>
  );
};

// export async function generateMetadata(): Promise<Metadata> {

//   return {
//     title: 'Floyx Decentralized',
//     openGraph: {
//       images: ['/'],
//     },
//     generator: 'Next.js',
//     applicationName: 'Floyx',
//     referrer: 'origin-when-cross-origin',
//     keywords: [],
//     authors: [
//       {
//         name: 'FLoyx',
//         url: "/",
//       },
//     ],
//     creator: 'Floyx creator',
//     publisher: 'Floyx publisher',
//     alternates: {
//       canonical: '/',
//       languages: {
//         'en-US': '/en-US',
//       },
//     },

//   };
// }

export default Home;
