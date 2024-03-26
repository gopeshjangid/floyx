import styled from '@emotion/styled';
import React from 'react';

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
    text-align: left;
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

const Heading = styled.div`
  flex: 1;
  position: relative;
  line-height: 24px;
  display: inline-block;
  max-width: 100%;
  z-index: 3;
`;
const HeadingContainerInfo = styled.div`
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

export const CompanyAboutInfo = () => {
  return (
    <HeadingContainerInfo>
      <Heading>
        Floyx is a decentralized social media platform whose main task is to
        take care of the digital security of all users in the world! Publish
        censorship-resistant content with innovative forms of monetization and
        stay in touch with everyone through
      </Heading>
    </HeadingContainerInfo>
  );
};

const CompanyAboutUs = () => {
  return (
    <FrameInnerContainer id="aboutus">
      <HeadingContainer>
        <Heading1>About Us</Heading1>
        <Heading2>
          We are on a mission to create a secure and uncensored digital space,
          driven by creators and accessible to millions of people around the
          world.
        </Heading2>
      </HeadingContainer>
      <TextContainer>
        <SubHeadings>
          You won't find EX founders from Google, Meta, Linkedin here.
        </SubHeadings>
        <SubHeadings>
          You won't find here big Venture Capitals, Angel Investors who value
          money above freedom.
        </SubHeadings>
        <SubHeadings>
          You won't read about us in Forbes, Bloomberg, The New York Times etc.
        </SubHeadings>
        <SubHeadings>&nbsp;</SubHeadings>
        <SubHeadings>
          Instead, you will find people like you who work hard for you every day
          and believe in a censorship-free and safe haven for every internet
          user.
        </SubHeadings>
        <SubHeadings>{` `}</SubHeadings>
        <SubHeadings>Be with us and join Floyx today.</SubHeadings>
      </TextContainer>
    </FrameInnerContainer>
  );
};

export default CompanyAboutUs;
