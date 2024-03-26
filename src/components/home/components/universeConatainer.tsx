import React from 'react'
import styled from '@emotion/styled';
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
  @media screen and (max-width: 430px) {
    position:relative;
    top: -90px;
   }
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
  width: 395px;
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

const UniverseComponent = () => {
 
  
  return (
    <MainContainer >
<TextOuterContainer>
            <TextInnerContainer>
              <HeadingContainer>Floyx Universe</HeadingContainer>
            </TextInnerContainer>
            <SubHeadingContainer>Floyx also offers additional areas. The easiest way to integrate cryptocurrencies, blockchain technology and the web3 world into the traditional market and global community. </SubHeadingContainer>
          </TextOuterContainer>
     
    </MainContainer>
  );
};

export default UniverseComponent;
