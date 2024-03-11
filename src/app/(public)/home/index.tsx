import type { NextPage } from "next";
import { Button } from "@mui/material";
import AboutUs from "./components/about-us";
import styled from '@emotion/styled';
import NavBar from "./components/frame-component1";
import EmailInputLabelFrame from "./components/email-input-label-frame";
import RegisterFormGroup from "./components/register-form-group";
import CenteredRectangle from "./components/centered-rectangle";
import Rectangle from "./components/rectangle";
import Group from "./components/formLayout";
import DownloadApp from "./components/download-app";
import FrameComponent from "./components/frame-component";
import RegisterContainer from "./components/register-container";
import FrameGroups from "./components/frame-groups";

const Desktop110Child = styled.img`
  width: 1717.6px;
  height: 1606.5px;
  position: absolute;
  margin: 0 !important;
  bottom: 4013.5px;
  left: -166px;
  object-fit: contain;
`;
const Desktop110Item = styled.img`
  width: 1045.9px;
  height: 1042.4px;
  position: absolute;
  margin: 0 !important;
  top: 2662px;
  right: -590.9px;
  object-fit: contain;
`;
const SecondLinkFrameChild = styled.img`
  position: absolute;
  top: 1464.5px;
  left: -401.8px;
  width: 700.8px;
  height: 871.5px;
  object-fit: contain;
`;
const SecondLinkFrameItem = styled.img`
  position: absolute;
  top: 0px;
  left: -78px;
  width: 1690.7px;
  height: 1734.1px;
  object-fit: contain;
  z-index: 1;
`;
const SecondLinkFrame = styled.section`
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
const Desktop110Inner = styled.div`
  width: 270.5px;
  height: 594.3px;
  position: relative;
  border-radius: 50%;
  background-color: #ffad0e;
  filter: blur(280.69px);
  display: none;
  z-index: 5;
`;
const EllipseDiv = styled.div`
  width: 270.5px;
  height: 594.3px;
  position: relative;
  border-radius: 50%;
  background-color: rgba(255, 173, 14, 0.69);
  filter: blur(280.69px);
  display: none;
  z-index: 6;
`;
const FrameDiv = styled.div`
  width: 561px;
  display: none;
  max-width: 100%;
  z-index: 7;
`;
const RectangleDiv = styled.div`
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
const Desktop110Child1 = styled.div`
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
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0px 0px 36.60000000000037px;
  box-sizing: border-box;
  gap: 45px 0px;
  max-width: 100%;
  @media screen and (max-width: 800px) {
    gap: 22px 0px;
  }
`;
const Posts = styled.b`
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
const Name1 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px 0px 21px;
`;
const CreateQuickPosts = styled.div`
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
`;
const NameParent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 18px 0px;
`;
const PostsIcon = styled.img`
  margin-left: -614px;
  width: 1579px;
  height: 526px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  object-fit: cover;
  max-width: 481%;
  z-index: 2;
`;
const Ellipse = styled.section`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 556px 22px;
  box-sizing: border-box;
  gap: 58px 0px;
  max-width: 100%;
  text-align: left;
  font-size: 50px;
  color: #fff;
  font-family: Poppins;
  @media screen and (max-width: 1350px) {
    padding-left: 278px;
    padding-right: 278px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 800px) {
    gap: 29px 0px;
    padding-left: 139px;
    padding-right: 139px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 450px) {
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
`;
const FloyxUniverse = styled.b`
  width: 359px;
  position: absolute;
  margin: 0 !important;
  right: 539.5px;
  bottom: 3672px;
  letter-spacing: -0.02em;
  line-height: 120%;
  display: inline-block;
  z-index: 3;
  @media screen and (max-width: 800px) {
    font-size: 40px;
    line-height: 48px;
  }
  @media screen and (max-width: 450px) {
    font-size: 30px;
    line-height: 36px;
  }
`;
const LabelChild = styled.img`
  align-self: stretch;
  height: 588.1px;
  position: relative;
  max-width: 100%;
  overflow: hidden;
  flex-shrink: 0;
  object-fit: contain;
  @media screen and (max-width: 1350px) {
    align-self: stretch;
    width: auto;
  }
`;
const Label = styled.div`
  margin-left: -194.8px;
  height: 588.1px;
  width: 463.6px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10.699999999999818px 0px 0px 0px;
  box-sizing: border-box;
  min-width: 463.6px;
  max-width: 100%;
  @media screen and (max-width: 1350px) {
    flex: 1;
  }
  @media screen and (max-width: 800px) {
    min-width: 100%;
  }
`;
const Videos = styled.b`
  width: 212px;
  height: 40px;
  position: relative;
  letter-spacing: 1px;
  line-height: 45px;
  text-transform: capitalize;
  display: inline-block;
  flex-shrink: 0;
  @media screen and (max-width: 800px) {
    font-size: 40px;
    line-height: 36px;
  }
  @media screen and (max-width: 450px) {
    font-size: 30px;
    line-height: 27px;
  }
`;
const CreateInterestingVideos = styled.div`
  align-self: stretch;
  height: 47px;
  position: relative;
  font-size: 18px;
  line-height: 27px;
  color: rgba(255, 255, 255, 0.7);
  display: inline-block;
  flex-shrink: 0;
`;
const TextConfirmation = styled.div`
  width: 442px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 29px 0px;
  max-width: 100%;
`;
const Icon1 = styled.img`
  height: 20px;
  width: 20px;
  position: relative;
`;
const Text1 = styled.div`
  align-self: stretch;
  flex: 1;
  position: relative;
  letter-spacing: 0.25px;
  line-height: 20px;
  font-weight: 600;
`;
const TextContainer = styled.div`
  height: 20px;
  width: 32px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  opacity: 0;
`;
const CrossIcon = styled.img`
  height: 20px;
  width: 20px;
  position: relative;
  object-fit: cover;
  display: none;
`;
const VideoLive = styled.div`
  align-self: stretch;
  width: 77px;
  border-radius: 20px;
  background-color: #d24857;
  border: 1px solid #c74e5b;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 11px 8px 7px;
  gap: 0px 4px;
`;
const ImageGoogleLogo = styled.div`
  flex: 1;
  position: relative;
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 20px;
  font-weight: 600;
  font-family: Poppins;
  color: #eff0fa;
  text-align: center;
`;
const TextContainer1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 4px;
`;
const Chip = styled.button`
  cursor: pointer;
  border: 1px solid #1d1f27;
  padding: 8px 7px 8px 11px;
  background-color: #0b081f;
  align-self: stretch;
  width: 171px;
  border-radius: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const VideoLiveParent = styled.div`
  width: 268px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;
const AspectRatioKeeperRotated = styled.div`
  width: 529.2px;
  flex: 1;
  transform: rotate(-34.23deg);
  max-width: 100%;
`;
const FixedAspectRatioSpacer = styled.div`
  align-self: stretch;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
`;
const ImageIcon = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  margin: 0 !important;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  object-fit: cover;
  z-index: 1;
`;
const VideoTile = styled.div`
  align-self: stretch;
  height: 360px;
  border-radius: 16px;
  background-color: #11131a;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  max-width: 100%;
`;
const Icon2 = styled.img`
  height: 32px;
  width: 32px;
  position: relative;
`;
const GoLive = styled.div`
  align-self: stretch;
  width: 61px;
  position: relative;
  letter-spacing: 0.5px;
  line-height: 24px;
  font-weight: 600;
  display: none;
`;
const TextBox = styled.div`
  height: 24px;
  width: 61px;
  display: none;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;
const InputContainerFrame = styled.img`
  height: 48px;
  width: 1px;
  position: relative;
`;
const OverflowMoreDotsVertica = styled.img`
  height: 24px;
  width: 24px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
`;
const IconButton1 = styled.div`
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid #272a31;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 6px;
  gap: 0px 9px;
`;
const Div = styled.div`
  width: 7px;
  position: relative;
  letter-spacing: 1.5px;
  line-height: 16px;
  text-transform: uppercase;
  font-weight: 600;
  display: none;
`;
const Notification1 = styled.div`
  width: 24px;
  margin: 0 !important;
  position: absolute;
  top: -8px;
  right: -8px;
  border-radius: 40px;
  background-color: #2e3038;
  height: 24px;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
  z-index: 1;
  font-size: 10px;
`;
const Audio1 = styled.div`
  width: 35px;
  position: absolute;
  margin: 0 !important;
  bottom: -20px;
  left: calc(50% - 18px);
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 16px;
  color: rgba(224, 236, 255, 0.8);
  display: none;
  z-index: 2;
`;
const ActionButtondesktop = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  gap: 4px 0px;
`;
const GoLive1 = styled.div`
  align-self: stretch;
  width: 61px;
  position: relative;
  font-size: 16px;
  letter-spacing: 0.5px;
  line-height: 24px;
  font-weight: 600;
  font-family: Inter;
  color: #eff0fa;
  text-align: center;
  display: none;
`;
const TextBox1 = styled.div`
  height: 24px;
  width: 77px;
  display: none;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 8px;
  box-sizing: border-box;
`;
const IconButton2 = styled.div`
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid #272a31;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 7px;
`;
const Div1 = styled.div`
  width: 7px;
  position: relative;
  font-size: 10px;
  letter-spacing: 1.5px;
  line-height: 16px;
  text-transform: uppercase;
  font-weight: 600;
  font-family: Inter;
  color: #eff0fa;
  text-align: center;
  display: none;
`;
const Notification2 = styled.div`
  width: 24px;
  margin: 0 !important;
  position: absolute;
  top: -8px;
  right: -8px;
  border-radius: 40px;
  background-color: #2e3038;
  height: 24px;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
  z-index: 1;
`;
const Audio2 = styled.div`
  width: 35px;
  position: absolute;
  margin: 0 !important;
  bottom: -20px;
  left: calc(50% - 18px);
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 16px;
  font-family: Inter;
  color: rgba(224, 236, 255, 0.8);
  text-align: center;
  display: none;
  z-index: 2;
`;
const ActionButtondesktop1 = styled.button`
  cursor: pointer;
  border: none;
  padding: 0;
  background-color: transparent;
  width: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  gap: 4px 0px;
`;
const GeneralControls = styled.div`
  width: 260px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0px 16px;
`;
const Unit = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  @media screen and (max-width: 450px) {
    flex-wrap: wrap;
  }
`;
const InputText = styled.div`
  position: relative;
  letter-spacing: 0.5px;
  line-height: 24px;
`;
const IBeam = styled.div`
  height: 24px;
  width: 2px;
  position: relative;
  border-right: 2px solid #eff0fa;
  box-sizing: border-box;
  display: none;
`;
const TypedContent = styled.input`
  width: 0px;
  border: none;
  outline: none;
  background-color: transparent;
  height: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: Roboto;
  font-size: 16px;
  color: #303030;
`;
const FieldContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0px 3px;
  max-width: 100%;
`;
const InputBox = styled.div`
  align-self: stretch;
  height: 58px;
  border-radius: 8px;
  background-color: #1b1830;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 12px 24px;
  box-sizing: border-box;
  max-width: 100%;
`;
const InputField = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 324px;
  max-width: 100%;
`;
const Button1 = styled(Button)`
  height: 58px;
  width: 126px;
`;
const ContainernameInput = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 16px;
  max-width: 100%;
  text-align: left;
  font-family: Poppins;
  @media screen and (max-width: 800px) {
    flex-wrap: wrap;
  }
`;
const Containerpreview = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px 0px;
  max-width: 100%;
  font-size: 16px;
  color: #eff0fa;
`;
const FrameParent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 40px 0px;
  max-width: 100%;
  font-size: 14px;
  color: #ffedec;
  font-family: Inter;
  @media screen and (max-width: 800px) {
    gap: 20px 0px;
  }
`;
const TextEnterEmailAddress = styled.div`
  width: 640px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 47px 0px;
  min-width: 640px;
  max-width: 100%;
  z-index: 1;
  @media screen and (max-width: 1350px) {
    flex: 1;
  }
  @media screen and (max-width: 800px) {
    gap: 23px 0px;
    min-width: 100%;
  }
`;
const TextInput = styled.section`
  width: 1060px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 20px 3px 0px;
  box-sizing: border-box;
  gap: 0px 131.2px;
  max-width: 100%;
  text-align: center;
  font-size: 50px;
  color: #fff;
  font-family: Poppins;
  @media screen and (max-width: 1350px) {
    flex-wrap: wrap;
    gap: 0px 66px;
    justify-content: center;
  }
  @media screen and (max-width: 800px) {
    gap: 0px 33px;
  }
  @media screen and (max-width: 450px) {
    gap: 0px 16px;
  }
`;
const TextContainer2 = styled.div`
  width: 1318px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 14.099999999999907px 20px;
  box-sizing: border-box;
  max-width: 100%;
`;
const FloyxAlsoOffers = styled.div`
  width: 886px;
  position: relative;
  line-height: 27px;
  display: inline-block;
  flex-shrink: 0;
  max-width: 100%;
  box-sizing: border-box;
  padding-right: 20px;
`;
const FloyxAlsoOffersAdditionalAWrapper = styled.div`
  width: 1172px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 8px 20px;
  box-sizing: border-box;
  max-width: 100%;
`;
const TextFrame = styled.section`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0px 0px 46px;
  box-sizing: border-box;
  gap: 57px 0px;
  max-width: 100%;
  text-align: center;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  font-family: Poppins;
  @media screen and (max-width: 1350px) {
    padding-bottom: 20px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 800px) {
    gap: 28px 0px;
  }
`;
const ConatinerWrapper = styled.div`
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

const Desktop: NextPage = () => {
  return (
    <ConatinerWrapper>
      <AboutUs />

      <Desktop110Child alt="" src="/group-342@2x.png" />
      <Desktop110Item alt="" src="/group-340@2x.png" />
      <SecondLinkFrame>
        <SecondLinkFrameChild alt="" src="/group-339@2x.png" />
        <SecondLinkFrameItem alt="" src="/group-338@2x.png" />
      </SecondLinkFrame>
      <ClippedIcon alt="" src="/clipped.svg" />
      <Desktop110Inner />
      <EllipseDiv />
      <FrameDiv />
      <RectangleDiv />
      <Desktop110Child1 />
      <NavBarContainer>
        <NavBar />
        <EmailInputLabelFrame />
      </NavBarContainer>
      <Ellipse>
        <NameParent>
          <Name1>
            <Posts>Posts</Posts>
          </Name1>
          <CreateQuickPosts>
            Create quick posts without worrying about the character limit!
          </CreateQuickPosts>
        </NameParent>
        <PostsIcon loading="lazy" alt="" src="/posts@2x.png" />
      </Ellipse>
      <FloyxUniverse>Floyx Universe</FloyxUniverse>
      <RegisterFormGroup />
      <TextInput>
        <Label>
          <LabelChild loading="lazy" alt="" src="/group-341@2x.png" />
        </Label>
        <TextEnterEmailAddress>
          <TextConfirmation>
            <Videos>Videos</Videos>
            <CreateInterestingVideos>
              Create interesting videos, launch a live stream and let your
              channel grow.
            </CreateInterestingVideos>
          </TextConfirmation>
          <FrameParent>
            <VideoLiveParent>
              <VideoLive>
                <Icon1 alt="" />
                <TextContainer>
                  <Text1>LIVE</Text1>
                </TextContainer>
                <CrossIcon alt="" src="/cross@2x.png" />
              </VideoLive>
              <Chip>
                <TextContainer1>
                  <ImageGoogleLogo>10 others in session</ImageGoogleLogo>
                </TextContainer1>
              </Chip>
            </VideoLiveParent>
            <Containerpreview>
              <VideoTile>
                <FixedAspectRatioSpacer>
                  <AspectRatioKeeperRotated />
                </FixedAspectRatioSpacer>
                <ImageIcon alt="" src="/image@2x.png" />
              </VideoTile>
              <Unit>
                <GeneralControls>
                  <ActionButtondesktop>
                    <IconButton1>
                      <Icon2 loading="lazy" alt="" src="/icon-1.svg" />
                      <TextBox>
                        <GoLive>Go Live</GoLive>
                      </TextBox>
                      <InputContainerFrame
                        alt=""
                        src="/input-container-frame.svg"
                      />
                      <OverflowMoreDotsVertica
                        alt=""
                        src="/overflow-more-dots--vertical.svg"
                      />
                    </IconButton1>
                    <Notification1>
                      <Div>5</Div>
                    </Notification1>
                    <Audio1>Audio</Audio1>
                  </ActionButtondesktop>
                  <ActionButtondesktop>
                    <IconButton1>
                      <Icon2 loading="lazy" alt="" src="/icon-2.svg" />
                      <TextBox>
                        <GoLive>Go Live</GoLive>
                      </TextBox>
                      <InputContainerFrame
                        alt=""
                        src="/input-container-frame.svg"
                      />
                      <OverflowMoreDotsVertica
                        alt=""
                        src="/overflow-more-dots--vertical.svg"
                      />
                    </IconButton1>
                    <Notification1>
                      <Div>5</Div>
                    </Notification1>
                    <Audio1>Audio</Audio1>
                  </ActionButtondesktop>
                  <ActionButtondesktop1>
                    <IconButton2>
                      <Icon2 alt="" src="/icon-3.svg" />
                      <TextBox1>
                        <GoLive1>Go Live</GoLive1>
                      </TextBox1>
                    </IconButton2>
                    <Notification2>
                      <Div1>5</Div1>
                    </Notification2>
                    <Audio2>Audio</Audio2>
                  </ActionButtondesktop1>
                </GeneralControls>
                <ActionButtondesktop1>
                  <IconButton2>
                    <Icon2 alt="" src="/icon-4.svg" />
                    <TextBox1>
                      <GoLive1>Go Live</GoLive1>
                    </TextBox1>
                  </IconButton2>
                  <Notification2>
                    <Div1>5</Div1>
                  </Notification2>
                  <Audio2>Audio</Audio2>
                </ActionButtondesktop1>
              </Unit>
              <ContainernameInput>
                <InputField>
                  <InputBox>
                    <FieldContent>
                      <InputText>{`David Mitchell `}</InputText>
                      <IBeam />
                      <TypedContent placeholder="David Mitchell" type="text" />
                    </FieldContent>
                  </InputBox>
                </InputField>
                <Button1
                  disableElevation={true}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    color: "#0b081f",
                    fontSize: "16",
                    background: "#5599ff",
                    borderRadius: "8px",
                    "&:hover": { background: "#5599ff" },
                    width: 126,
                    height: 58,
                  }}
                >
                  Join Now
                </Button1>
              </ContainernameInput>
            </Containerpreview>
          </FrameParent>
        </TextEnterEmailAddress>
      </TextInput>
      <CenteredRectangle />
      <TextFrame>
        <Rectangle />
        <TextContainer2>
          <Group />
          <DownloadApp />
        </TextContainer2>
        <FloyxAlsoOffersAdditionalAWrapper>
          <FloyxAlsoOffers>{`Floyx also offers additional areas. The easiest way to integrate cryptocurrencies, blockchain technology and the web3 world into the traditional market and global community. `}</FloyxAlsoOffers>
        </FloyxAlsoOffersAdditionalAWrapper>
        <FrameComponent />
      </TextFrame>
      <RegisterContainer />
      <FrameGroups />
    </ConatinerWrapper>
  );
};

export default Desktop;
