import type { NextPage } from "next";
import styled from '@emotion/styled'
  ;

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
  z-index: 1;
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
  z-index: 2;
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
  align-self: stretch;
  position: relative;
  font-size: 18px;
  line-height: 27px;
  color: rgba(255, 255, 255, 0.7);
`;
const SignUpButton = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 23px 0px;
  z-index: 1;
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

const CenteredRectangle: NextPage = () => {
  return (
    <CenteredRectangleRoot>
      <Podcast>
        <PodcastChild alt="" src="/group-338@2x.png" />
        <Scribble />
        <HomeIcon loading="lazy" alt="" src="/home@2x.png" />
        <SparkleIcon alt="" src="/sparkle@2x.png" />
        <SparkleIcon1 loading="lazy" alt="" src="/sparkle-1@2x.png" />
        <SparkleIcon2 alt="" src="/sparkle-2@2x.png" />
        <PlayIcon loading="lazy" alt="" src="/play@2x.png" />
        <SignUpButton>
          <AccessKeyField>
            <Podcasts>Podcasts</Podcasts>
          </AccessKeyField>
          <RecordContentConduct>{`Record content, conduct interesting interviews and let yourself be found by millions of listeners around the world! `}</RecordContentConduct>
        </SignUpButton>
      </Podcast>
      <PodcastVoiceLines>
        <UnionIcon alt="" src="/union.svg" />
      </PodcastVoiceLines>
    </CenteredRectangleRoot>
  );
};

export default CenteredRectangle;
