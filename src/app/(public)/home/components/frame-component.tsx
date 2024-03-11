import type { NextPage } from "next";
import { Button } from "@mui/material";
import styled from '@emotion/styled'
  ;

const FrameChild = styled.div`
  align-self: stretch;
  width: 1px;
  position: relative;
  border-right: 1px solid rgba(255, 255, 255, 0.04);
  box-sizing: border-box;
  display: none;
`;
const SocialFiMarketplace = styled.div`
  height: 1064px;
  width: 1px;
  position: relative;
  border-right: 1px solid rgba(255, 255, 255, 0.04);
  box-sizing: border-box;
  @media screen and (max-width: 800px) {
    width: 100%;
    height: 1px;
  }
`;
const SocialFiMarketplace1 = styled.div`
  height: 1064px;
  width: 1px;
  position: relative;
  border-right: 1px solid rgba(255, 255, 255, 0);
  box-sizing: border-box;
  @media screen and (max-width: 800px) {
    width: 100%;
    height: 1px;
  }
`;
const SocialFiMarketplace2 = styled.div`
  height: 1064px;
  width: 1px;
  position: relative;
  border-right: 1px solid rgba(38, 36, 51, 0);
  box-sizing: border-box;
  @media screen and (max-width: 800px) {
    width: 100%;
    height: 1px;
  }
`;
const LineParent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0px 0px 0px 56px;
  gap: 20px;
  @media screen and (max-width: 1350px) {
    padding-left: 28px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 800px) {
    flex-wrap: wrap;
  }
`;
const UsernameInput = styled.div`
  align-self: stretch;
  height: 1px;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  box-sizing: border-box;
`;
const UsernameInput1 = styled.div`
  align-self: stretch;
  height: 1px;
  position: relative;
  border-top: 1px solid rgba(38, 36, 51, 0.29);
  box-sizing: border-box;
`;
const UsernameInputParent = styled.div`
  height: 1064px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 56px 0px;
  max-width: 100%;
  z-index: 1;
  @media screen and (max-width: 800px) {
    gap: 28px 0px;
  }
`;
const FrameWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 8px;
  box-sizing: border-box;
  max-width: 100%;
  margin-top: -1064px;
`;
const FrameParent = styled.div`
  width: 100%;
  margin: 0 !important;
  position: absolute;
  height: 100%;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
`;
const FrameItem = styled.div`
  height: 1px;
  width: 76px;
  position: relative;
  border-top: 1px solid rgba(166, 98, 255, 0);
  box-sizing: border-box;
`;
const ShineBackgroundInner = styled.div`
  width: 404px;
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 20px 0px;
  box-sizing: border-box;
  max-width: 100%;
`;
const FrameInner = styled.div`
  align-self: stretch;
  width: 1px;
  position: relative;
  border-right: 1px solid rgba(66, 133, 244, 0);
  box-sizing: border-box;
  z-index: 2;
`;
const ShineBackgroundChild = styled.div`
  align-self: stretch;
  height: 76px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 1112px 0px 0px;
  box-sizing: border-box;
  @media screen and (max-width: 1150px) {
    padding-right: 556px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 800px) {
    padding-right: 278px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 450px) {
    padding-right: 20px;
    box-sizing: border-box;
  }
`;
const FrameDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 29px 262px 0px;
`;
const FrameChild1 = styled.div`
  height: 1px;
  width: 76px;
  position: relative;
  border-top: 1px solid rgba(166, 98, 255, 0);
  box-sizing: border-box;
  z-index: 2;
`;
const ShineBackgroundInner1 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 138px 0px;
`;
const FrameChild2 = styled.div`
  align-self: stretch;
  width: 1px;
  position: relative;
  border-right: 1px solid rgba(166, 98, 255, 0);
  box-sizing: border-box;
  z-index: 2;
`;
const FrameChild3 = styled.div`
  align-self: stretch;
  height: 1px;
  position: relative;
  border-top: 1px solid rgba(166, 98, 255, 0);
  box-sizing: border-box;
  z-index: 2;
`;
const LineWrapper = styled.div`
  height: 32px;
  width: 76px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 32px;
  box-sizing: border-box;
`;
const LineGroup = styled.div`
  width: 253px;
  height: 76px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
`;
const ShineBackground = styled.div`
  margin-right: -280px;
  width: 1456px;
  height: 1064px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0px 82px 24px 74px;
  box-sizing: border-box;
  position: relative;
  gap: 98px 0px;
  max-width: 162%;
  flex-shrink: 0;
  @media screen and (max-width: 800px) {
    height: auto;
    gap: 49px 0px;
    padding-left: 37px;
    padding-right: 41px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 450px) {
    gap: 24px 0px;
  }
`;
const FloyxMarketplace = styled.div`
  width: 264px;
  position: relative;
  letter-spacing: -0.01em;
  line-height: 120%;
  font-weight: 600;
  background: linear-gradient(86.55deg, #ab59ff, #858fff 56.79%, #4d9aff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  @media screen and (max-width: 450px) {
    font-size: 23px;
    line-height: 28px;
  }
`;
const FloyxMarketplaceWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
`;
const HaveYouHeard = styled.p`
  margin: 0;
`;
const HaveYouHeardContainer = styled.div`
  align-self: stretch;
  height: 154px;
  position: relative;
  font-size: 16px;
  line-height: 27px;
  display: inline-block;
  flex-shrink: 0;
`;
const FrameGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 33px 0px;
  max-width: 100%;
  @media screen and (max-width: 450px) {
    gap: 16px 0px;
  }
`;
const EcoSystemInner = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 40px 26px;
  box-sizing: border-box;
  max-width: 100%;
`;
const FrameButton = styled(Button)`
  align-self: stretch;
  height: 48px;
`;
const EllipseDiv = styled.div`
  height: 12px;
  width: 12px;
  position: relative;
  border-radius: 50%;
  background-color: #4285f4;
`;
const TextInput = styled.div`
  width: 9px;
  height: 9px;
  position: relative;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.37);
`;
const TextFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1.5px 0px 0px;
`;
const EllipseParent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 10px;
`;
const FrameWrapper1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 77px;
`;
const FrameContainer = styled.div`
  width: 224px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 34px 0px;
`;
const LandingPage = styled.img`
  align-self: stretch;
  height: 615px;
  position: relative;
  max-width: 100%;
  overflow: hidden;
  flex-shrink: 0;
  object-fit: cover;
`;
const EcoSystem = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 28px 0px;
  max-width: 100%;
  z-index: 3;
  margin-top: -1014px;
`;
const ShineBackgroundParentRoot = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0px 271px;
  box-sizing: border-box;
  max-width: 100%;
  text-align: center;
  font-size: 29px;
  color: rgba(255, 255, 255, 0.7);
  font-family: Poppins;
  @media screen and (max-width: 1350px) {
    padding-left: 135px;
    padding-right: 135px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 800px) {
    padding-left: 67px;
    padding-right: 67px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 450px) {
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
`;

const FrameComponent: NextPage = () => {
  return (
    <ShineBackgroundParentRoot>
      <ShineBackground>
        <FrameParent>
          <LineParent>
            <FrameChild />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace1 />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace2 />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
            <SocialFiMarketplace />
          </LineParent>
          <FrameWrapper>
            <UsernameInputParent>
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput1 />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
              <UsernameInput />
            </UsernameInputParent>
          </FrameWrapper>
        </FrameParent>
        <ShineBackgroundInner>
          <FrameItem />
        </ShineBackgroundInner>
        <ShineBackgroundChild>
          <FrameInner />
        </ShineBackgroundChild>
        <FrameDiv>
          <FrameInner />
        </FrameDiv>
        <ShineBackgroundInner1>
          <FrameChild1 />
        </ShineBackgroundInner1>
        <LineGroup>
          <FrameChild2 />
          <LineWrapper>
            <FrameChild3 />
          </LineWrapper>
        </LineGroup>
      </ShineBackground>
      <EcoSystem>
        <EcoSystemInner>
          <FrameGroup>
            <FloyxMarketplaceWrapper>
              <FloyxMarketplace>Floyx Marketplace</FloyxMarketplace>
            </FloyxMarketplaceWrapper>
            <HaveYouHeardContainer>
              <HaveYouHeard>{`Have you heard of NFT? Are you a talented graphic designer, painter, musician, photographer or just want to try your hand at this art? Check out our modern and innovative Marketplace, which allows you to monetize your artwork, as well as profit from each subsequent sale through a loyalty system. `}</HaveYouHeard>
              <HaveYouHeard>&nbsp;</HaveYouHeard>
              <HaveYouHeard>
                Are you a beginner? No problem! Floyx has created tools that
                will allow you to create your first NFT collection completely
                free of charge!
              </HaveYouHeard>
            </HaveYouHeardContainer>
          </FrameGroup>
        </EcoSystemInner>
        <FloyxMarketplaceWrapper>
          <FrameContainer>
            <FrameButton
              disableElevation={true}
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#0b081f",
                fontSize: "16",
                background:
                  "linear-gradient(86.55deg, #ab59ff, #858fff 56.79%, #4d9aff)",
                borderRadius: "10px",
                "&:hover": {
                  background:
                    "linear-gradient(86.55deg, #ab59ff, #858fff 56.79%, #4d9aff)",
                },
                height: 48,
              }}
            >
              Check more details
            </FrameButton>
            <FrameWrapper1>
              <EllipseParent>
                <EllipseDiv />
                <TextFrame>
                  <TextInput />
                </TextFrame>
                <TextFrame>
                  <TextInput />
                </TextFrame>
                <TextFrame>
                  <TextInput />
                </TextFrame>
              </EllipseParent>
            </FrameWrapper1>
          </FrameContainer>
        </FloyxMarketplaceWrapper>
        <LandingPage loading="lazy" alt="" src="/landing-page-2@2x.png" />
      </EcoSystem>
    </ShineBackgroundParentRoot>
  );
};

export default FrameComponent;
