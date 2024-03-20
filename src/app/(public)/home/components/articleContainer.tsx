import type { NextPage } from "next";
import styled from '@emotion/styled'  ;
import { AnimateArticles } from "../components/Animations/Posts/animateArticles"

const Heading1 = styled.b`
  position: relative;
  letter-spacing: 1px;
  line-height: 40px;
  text-transform: capitalize;
  @media screen and (max-width: 800px) {
    font-size: 40px;
    line-height: 36px;
  }
  @media screen and (max-width: 450px) {
    font-size: 30px;
    line-height: 27px;
  }
`;
const TextWrap = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
`;
const Heading2 = styled.div`
  align-self: stretch;
  height: 47px;
  position: relative;
  font-size: 18px;
  line-height: 27px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  display: inline-block;
  flex-shrink: 0;
`;
const TextContainer = styled.div`
  width: 442px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 29px 0px;
  max-width: 100%;
`;
const TextOutterContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
  box-sizing: border-box;
  max-width: 100%;
`;
const ArticleAnimateBg = styled.div`
  position: absolute;
  top: 0px;
  left: calc(50% - 394px);
  
  width: 100%;
  height: 100%;
`;
const ArticleContent = styled.img`
  position: absolute;
  height: 100%;
  top: 0px;
  bottom: 0px;
  left: 108px;
  max-height: 100%;
  width: 571px;
  object-fit: cover;
  z-index: 1;
`;
const ArticleAnimateWrap = styled.div`
  align-self: stretch;
  height: 694px;
  position: relative;
  margin-top:20px
  z-index: 1;
   border-radius: 10px;
  background-color: rgba(11, 8, 31, 0.5);
  border: 1px solid #ab59ff;
  box-sizing: border-box;
   @media screen and (max-width: 550px) {
   height: 400px;
   margin-top:20px
  }
  @media screen and (max-width: 365px) {
   height: 400px;
   margin-top:70px
  }
  
`;
const InnerContainer = styled.div`
   width: 788px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 45px 0px;
  max-width: 100%;
  @media screen and (max-width: 450px) {
    gap: 22px 0px;
  }
`;
const MainContainer = styled.section`
width:100%;
  align-self: center;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
 
  box-sizing: border-box;
  max-width: 100%;
  text-align: left;
  font-size: 50px;
  color: #fff;
  font-family: Poppins;
  overflow:hidden;
`;

const ArticleContainer = () => {
  return (
    
    <MainContainer>
      <InnerContainer>
        <TextOutterContainer>
          <TextContainer>
            <TextWrap>
              <Heading1>Articles</Heading1>
            </TextWrap>
            <Heading2>Manage your blog, collect tips and build a loyal audience appreciating the noble art of writing. </Heading2>
          </TextContainer>
        </TextOutterContainer>
        <ArticleAnimateWrap>
          <ArticleAnimateBg />
          <AnimateArticles />
        </ArticleAnimateWrap>
      </InnerContainer>
    </MainContainer>
  );
};

export default ArticleContainer;
