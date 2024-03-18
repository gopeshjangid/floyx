import type { NextPage } from "next";
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import styled from '@emotion/styled'
  ;
import FrameName from "./frame-name";

const WeAreOne = styled.b`
  width: 710px;
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
const DecentralizedOperators = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
`;
const AllOfThe = styled.div`
  align-self: stretch;
  position: relative;
  font-size: 18px;
  line-height: 27px;
  color: rgba(255, 255, 255, 0.7);
  white-space: pre-wrap;
`;
const IntroText = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 23px 0px;
`;
const ShadowIcon = styled.img`
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  flex-shrink: 0;
  object-fit: contain;
  position: absolute;
  left: 0px;
  top: 0px;
  transform: scale(1.195);
`;
const WrapperShadow = styled.div`
  width: 100%;
  height: 1026.7px;
  position: absolute;
  margin: 0 !important;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-radius: 35px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
`;
const Text1 = styled.div`
  width: 103%;
  height: 1026.7px;
  position: absolute;
  margin: 0 !important;
  top: 0px;
  right: 0px;
  left: 0px;
  background: linear-gradient(156.07deg, #0a0e29, #2c4088 42.37%);
  border: 1.5px solid rgba(255, 255, 255, 0);
  box-sizing: border-box;
  mix-blend-mode: normal;
  z-index: 1;
`;
const TextIcon = styled.img`
  width: 100%;
  height: 100%;
  mix-blend-mode: overlay;
  z-index: 3;
  object-fit: contain;
  position: absolute;
  left: 0px;
  top: 0px;
  transform: scale(1.987);
`;
const WrapperText = styled.div`
  width: 1136.9px;
  height: 546.9px;
  position: absolute;
  margin: 0 !important;
  right: -16.1px;
  bottom: -93.3px;
  mix-blend-mode: overlay;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImageIcon = styled.img`
  width: 944.6px;
  height: 650.4px;
  position: absolute;
  margin: 0 !important;
  right: -244.5px;
  bottom: 150.4px;
  object-fit: contain;
  mix-blend-mode: linear-dodge;
  z-index: 4;
`;
const WrapperRectangle38Child = styled.img`
  width: 100%;
  height: 100%;
  mix-blend-mode: overlay;
  z-index: 5;
  object-fit: contain;
  position: absolute;
  left: 0px;
  top: 0px;
  transform: scale(1.456);
`;
const WrapperRectangle = styled.div`
  width: 1512.7px;
  height: 350.9px;
  position: absolute;
  margin: 0 !important;
  right: -54.6px;
  bottom: -20.5px;
  mix-blend-mode: overlay;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WrapperRectangle39Child = styled.img`
  width: 100%;
  height: 100%;
  mix-blend-mode: overlay;
  z-index: 6;
  object-fit: contain;
  position: absolute;
  left: 0px;
  top: 0px;
  transform: scale(1.456);
`;
const WrapperRectangle1 = styled.div`
  width: 1512.7px;
  height: 350.9px;
  position: absolute;
  margin: 0 !important;
  right: -54.6px;
  bottom: -76.5px;
  mix-blend-mode: overlay;
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WrapperRectangle36Child = styled.img`
  height: 100%;
  width: 100%;
  mix-blend-mode: overlay;
  z-index: 4;
  object-fit: contain;
  position: absolute;
  left: 0px;
  top: 0px;
  transform: scale(1.456);
`;
const WrapperRectangle2 = styled.div`
  height: 350.9px;
  width: 1059.8px;
  position: absolute;
  margin: 0 !important;
  bottom: -209.3px;
  left: -543.4px;
  mix-blend-mode: overlay;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WrapperRectangle37Child = styled.img`
  height: 100%;
  width: 100%;
  mix-blend-mode: overlay;
  z-index: 7;
  object-fit: contain;
  position: absolute;
  left: 0px;
  top: 0px;
  transform: scale(1.456);
`;
const WrapperRectangle3 = styled.div`
  height: 350.9px;
  width: 1059.8px;
  position: absolute;
  margin: 0 !important;
  right: -647.8px;
  bottom: -60px;
  mix-blend-mode: overlay;
  z-index: 7;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const EmailFormInput = styled.img`
  height: 807.9px;
  width: 1352.6px;
  position: absolute;
  margin: 0 !important;
  right: -330.4px;
  bottom: -153px;
  object-fit: contain;
  mix-blend-mode: overlay;
  z-index: 8;
`;
const WhiteIcon = styled.img`
  height: 184.3px;
  width: 531.2px;
  position: absolute;
  margin: 0 !important;
  top: -114.8px;
  left: -280.1px;
  object-fit: contain;
  mix-blend-mode: color-dodge;
  z-index: 3;
`;
const CreateYourAccount = styled.b`
  width: 408px;
  position: relative;
  font-size: 30px;
  display: inline-block;
  font-family: Poppins;
  color: #fff;
  text-align: left;
  max-width: 100%;
  @media screen and (max-width: 800px) {
    font-size: 24px;
  }
  @media screen and (max-width: 450px) {
    font-size: 18px;
  }
`;
const FrameInput = styled.input`
  margin: 0;
  height: 21.5px;
  width: 19px;
`;
const SomeoneReccomendedFloyx = styled.div`
  position: relative;
  font-size: 16px;
  font-family: Poppins;
  color: #d1d0d5;
  text-align: left;
`;
const SomeoneReccomendedFloyxToMWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
`;
const FrameWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 243px;
  max-width: 100%;
`;
const FrameParent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 12px;
  max-width: 100%;
  @media screen and (max-width: 800px) {
    flex-wrap: wrap;
  }
`;
const ConfirmationFrameInner = styled.div`
  width: 413px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 4px;
  box-sizing: border-box;
  max-width: 100%;
`;
const EmailAddress = styled.span`
  color: #d1d0d5;
`;
const Span = styled.span`
  color: #ff5757;
`;
const EmailAddress1 = styled.div`
  height: 24px;
  position: relative;
  font-size: 16px;
  font-family: Poppins;
  text-align: left;
  display: inline-block;
`;
const EmailAddressFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const LinearProgressBar = styled.div`
  height: 24px;
  flex: 1;
  min-width: 135px;
`;
const EmailAddressFrameParent = styled.div`
  width: 396px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 63px;
  max-width: 100%;
  @media screen and (max-width: 800px) {
    flex-wrap: wrap;
  }
  @media screen and (max-width: 450px) {
    gap: 0px 31px;
  }
`;
const CreateAccountButton = styled(TextField)`
  border: none;
  background-color: transparent;
  width: 503px;
  height: 50px;
  font-family: Poppins;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.3);
  max-width: 124%;
  flex-shrink: 0;
`;
const FrameGroup = styled.div`
  width: 405px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 0px 0px;
  box-sizing: border-box;
  gap: 12px 0px;
  max-width: 100%;
`;
const FrameName1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 4px;
  box-sizing: border-box;
  max-width: 100%;
`;
const FrameChild = styled.div`
  height: 24px;
  width: 208px;
`;
const FrameContainer = styled.div`
  width: 351px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 63px;
  max-width: 100%;
  @media screen and (max-width: 800px) {
    flex-wrap: wrap;
    gap: 0px 31px;
  }
  @media screen and (max-width: 450px) {
    gap: 0px 16px;
  }
`;
const UsernameInputFrameChild = styled(TextField)`
  border: none;
  background-color: transparent;
  align-self: stretch;
  height: 50px;
  font-family: Poppins;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.3);
`;
const UsernameInputFrame = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px 0px;
  max-width: 100%;
`;
const FrameName2 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 0px 4px;
  box-sizing: border-box;
  max-width: 100%;
`;
const PasswordAtLeastContainer = styled.div`
  position: relative;
  font-size: 16px;
  font-family: Poppins;
  text-align: left;
`;
const GoogleLoginButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (max-width: 450px) {
    gap: 0px 33px;
  }
`;
const GroupContainer = styled(TextField)`
  border: none;
  background-color: transparent;
  align-self: stretch;
  height: 48px;
  font-family: Poppins;
  font-size: 22px;
  color: rgba(255, 255, 255, 0.3);
`;
const OrLink = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 4px 4px;
  box-sizing: border-box;
  max-width: 100%;
`;
const SelectionChild = styled.div`
  height: 35px;
  width: 311px;
  position: relative;
  background: linear-gradient(
    90deg,
    rgba(164, 98, 255, 0.4),
    rgba(138, 135, 255, 0.4) 54.69%,
    rgba(93, 150, 255, 0.4)
  );
  filter: blur(30px);
  display: none;
`;
const SignUpLabel = styled(Button)`
  height: 48px;
  flex: 1;
  max-width: 100%;
  @media screen and (max-width: 450px) {
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
`;
const Selection1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0px 0px 7px;
  box-sizing: border-box;
  max-width: 100%;
`;
const CreateAccountForm = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
`;
const LoginFormContainer = styled.input`
  margin: 0;
  height: 27px;
  width: 19px;
`;
const ByClickingSign = styled.span`
  color: #ceced2;
`;
const TermsOfService = styled.span`
  color: #5798ff;
`;
const ByClickingSignContainer = styled.div`
  flex: 1;
  position: relative;
  font-size: 16px;
  line-height: 24px;
  font-family: Poppins;
  text-align: left;
  display: inline-block;
  min-width: 244px;
  max-width: 100%;
`;
const ContainerFrame = styled.div`
  width: 409px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 14px;
  max-width: 100%;
  @media screen and (max-width: 800px) {
    flex-wrap: wrap;
  }
`;
const SelectionSignUp = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px 0px;
  max-width: 100%;
`;
const ConfirmationFrame = styled.form`
  margin: 0;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px 0px;
  max-width: 100%;
`;
const CreateAccountText = styled.div`
  width: 507px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20.5px 0px 0px;
  box-sizing: border-box;
  max-width: 100%;
`;
const OrLabel = styled.div`
  align-self: stretch;
  width: 1px;
  position: relative;
  border-right: 1px solid rgba(255, 255, 255, 0.18);
  box-sizing: border-box;
`;
const OrLabelWrapper = styled.div`
  width: 19px;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 8px 0px 9.5px;
  box-sizing: border-box;
`;
const Or = styled.div`
  position: relative;
`;
const OrLabelContainer = styled.div`
  width: 19px;
  height: 409px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 8px 0px 9.5px;
  box-sizing: border-box;
`;
const DividerLine = styled.div`
  height: 878px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 18px 0px;
`;
const RegisterWithYour = styled.b`
  width: 378px;
  position: relative;
  font-size: 30px;
  display: inline-block;
  max-width: 100%;
  @media screen and (max-width: 800px) {
    font-size: 24px;
  }
  @media screen and (max-width: 450px) {
    font-size: 18px;
  }
`;
const ForMainstreamUsers = styled.div`
  align-self: stretch;
  position: relative;
  font-size: 18px;
`;
const SignUpWith = styled.div`
  position: relative;
  font-weight: 500;
`;
const PrivacyPolicy = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 10px;
  background-color: #4285f4;
  width: 425px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 13px 20px;
  box-sizing: border-box;
  white-space: nowrap;
`;
const Image55Icon = styled.img`
  height: 21px;
  width: 21px;
  position: relative;
  object-fit: cover;
`;
const MainMenuLinks = styled.div`
  position: absolute;
  top: 7px;
  left: 8px;
  border-radius: 7px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 8px;
  z-index: 1;
`;
const FrameSignupWithGoogleLogo = styled.div`
  height: 50px;
  flex: 1;
  position: relative;
  max-width: 100%;
`;
const ConnectWalletLabel = styled.div`
  width: 353px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  color: #0b081f;
`;
const MakeRegistrationSmooth = styled.div`
  align-self: stretch;
  position: relative;
`;
const CreateAccountLabel = styled(Button)`
  align-self: stretch;
  height: 50px;
  position: relative;
`;
const ButtonGoogle = styled.div`
  align-self: stretch;
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
const GoogleLogo = styled.div`
  width: 425px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 189.5px 0px 0px;
  box-sizing: border-box;
  max-width: 100%;
  color: #fff;
  @media screen and (max-width: 800px) {
    padding-top: 123px;
    box-sizing: border-box;
  }
`;
const ExistingUsersText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 69px;
  max-width: 100%;
  z-index: 9;
  @media screen and (max-width: 1350px) {
    flex-wrap: wrap;
  }
  @media screen and (max-width: 1150px) {
    gap: 0px 34px;
  }
  @media screen and (max-width: 800px) {
    gap: 0px 17px;
  }
`;
const NameFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  max-width: 100%;
`;
const RegisterNow = styled.div`
  margin-left: -174px;
  width: 1442px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 70px 142px;
  box-sizing: border-box;
  position: relative;
  min-height: 1148px;
  max-width: 132%;
  flex-shrink: 0;
  z-index: 4;
  text-align: left;
  font-size: 16px;
  color: #d1d0d5;
  @media screen and (max-width: 1350px) {
    padding-left: 71px;
    padding-right: 71px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 1150px) {
    padding-top: 45px;
    padding-bottom: 45px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 800px) {
    padding: 29px 35px;
    box-sizing: border-box;
  }
`;
const RegisterContainerRoot = styled.section`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 173px 507px;
  box-sizing: border-box;
  gap: 40px 0px;
  max-width: 100%;
  text-align: center;
  font-size: 50px;
  color: #fff;
  font-family: Poppins;
  @media screen and (max-width: 1350px) {
    padding-left: 86px;
    padding-right: 86px;
    padding-bottom: 330px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 1150px) {
    padding-bottom: 214px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 800px) {
    gap: 20px 0px;
    padding-left: 43px;
    padding-right: 43px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 450px) {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 139px;
    box-sizing: border-box;
  }
`;

const RegisterContainer: NextPage = () => {
  return (
    <RegisterContainerRoot>
      <IntroText>
        <DecentralizedOperators>
          <WeAreOne>We are one instead of many!</WeAreOne>
        </DecentralizedOperators>
        <AllOfThe>{`All of the above functions are decentralized, operated directly on the blockchain network with additional support of smart contracts.  Each dedicated area in Floyx works independently of each other. However, by combining it all in one place - we create a complete ecosystem for the traditional world and the financial world. `}</AllOfThe>
      </IntroText>
      <RegisterNow>
        <WrapperShadow>
          <ShadowIcon alt="" src="/shadow.svg" />
        </WrapperShadow>
        <Text1 />
        {/* <WrapperText>
          <TextIcon alt="" src="/vector-1.svg" />
        </WrapperText>
        <ImageIcon alt="" src="/vector-2.svg" /> */}
        <WrapperRectangle>
          {/* <WrapperRectangle38Child alt="" src="/rectangle-38.svg" /> */}
        </WrapperRectangle>
        <WrapperRectangle1>
          {/* <WrapperRectangle39Child alt="" src="/rectangle-38.svg" /> */}
        </WrapperRectangle1>
        <NameFrame>
          <WrapperRectangle2>
            {/* <WrapperRectangle36Child alt="" src="/rectangle-36.svg" /> */}
          </WrapperRectangle2>
          <WrapperRectangle3>
            {/* <WrapperRectangle37Child alt="" src="/rectangle-37.svg" /> */}
          </WrapperRectangle3>
          {/* <EmailFormInput alt="" src="/vector-3.svg" /> */}
          <WhiteIcon alt="" src="/white.svg" />
          <ExistingUsersText>
            <CreateAccountText>
              <ConfirmationFrame>
                <CreateYourAccount>
                  Create your account for free through
                </CreateYourAccount>
                <FrameName name1="Name" exDustinMax="Ex. Dustin Max" />
                <FrameName name1="Username" exDustinMax="Ex. Dusti_96" />
                <ConfirmationFrameInner>
                  <FrameParent>
                    <FrameInput type="checkbox" />
                    <FrameWrapper>
                      <SomeoneReccomendedFloyxToMWrapper>
                        <SomeoneReccomendedFloyx>
                          Someone reccomended Floyx to me (optional)
                        </SomeoneReccomendedFloyx>
                      </SomeoneReccomendedFloyxToMWrapper>
                    </FrameWrapper>
                  </FrameParent>
                </ConfirmationFrameInner>
                <FrameName1>
                  <FrameGroup>
                    <EmailAddressFrameParent>
                      <EmailAddressFrame>
                        <EmailAddress1>
                          <EmailAddress>Email address</EmailAddress>
                          <Span>*</Span>
                        </EmailAddress1>
                      </EmailAddressFrame>
                      <LinearProgressBar />
                    </EmailAddressFrameParent>
                    <CreateAccountButton
                      placeholder="Ex. name@gmail.com"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <img
                            width="24px"
                            height="24px"
                            src="/vuesaxlinearsms.svg"
                          />
                        ),
                      }}
                      sx={{
                        "& fieldset": { border: "none" },
                        "& .MuiInputBase-root": {
                          height: "50px",
                          backgroundColor: "#1b1830",
                          paddingLeft: "21px",
                          borderRadius: "10px",
                        },
                        "& .MuiInputBase-input": {
                          paddingLeft: "10px",
                          color: "rgba(255, 255, 255, 0.3)",
                        },
                        width: "503px",
                      }}
                    />
                  </FrameGroup>
                </FrameName1>
                <FrameName2>
                  <UsernameInputFrame>
                    <FrameContainer>
                      <EmailAddressFrame>
                        <EmailAddress1>
                          <EmailAddress>
                            Email address confirmation
                          </EmailAddress>
                          <Span>*</Span>
                        </EmailAddress1>
                      </EmailAddressFrame>
                      <FrameChild />
                    </FrameContainer>
                    <UsernameInputFrameChild
                      placeholder="Enter your email address again"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <img
                            width="24px"
                            height="24px"
                            src="/vuesaxlinearsms-1.svg"
                          />
                        ),
                      }}
                      sx={{
                        "& fieldset": { border: "none" },
                        "& .MuiInputBase-root": {
                          height: "50px",
                          backgroundColor: "#1b1830",
                          paddingLeft: "21px",
                          borderRadius: "10px",
                        },
                        "& .MuiInputBase-input": {
                          paddingLeft: "10px",
                          color: "rgba(255, 255, 255, 0.3)",
                        },
                        width: "503px",
                      }}
                    />
                  </UsernameInputFrame>
                </FrameName2>
                <OrLink>
                  <UsernameInputFrame>
                    <GoogleLoginButton>
                      <EmailAddressFrame>
                        <PasswordAtLeastContainer>
                          <EmailAddress>
                            Password (at least 6 characters)
                          </EmailAddress>
                          <Span>*</Span>
                        </PasswordAtLeastContainer>
                      </EmailAddressFrame>
                    </GoogleLoginButton>
                    <GroupContainer
                      placeholder="************"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <img
                            width="22px"
                            height="22px"
                            src="/vuesaxlinearlock.svg"
                          />
                        ),
                      }}
                      sx={{
                        "& fieldset": { border: "none" },
                        "& .MuiInputBase-root": {
                          height: "48px",
                          backgroundColor: "#1b1830",
                          paddingLeft: "22px",
                          borderRadius: "10px",
                          fontSize: "22px",
                        },
                        "& .MuiInputBase-input": {
                          paddingLeft: "10px",
                          color: "rgba(255, 255, 255, 0.3)",
                        },
                        width: "503px",
                      }}
                    />
                  </UsernameInputFrame>
                </OrLink>
                <SelectionSignUp>
                  <CreateAccountForm>
                    <Selection1>
                      <SelectionChild />
                      <SignUpLabel
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
                        Sign up
                      </SignUpLabel>
                    </Selection1>
                  </CreateAccountForm>
                  <ContainerFrame>
                    <LoginFormContainer type="checkbox" />
                    <ByClickingSignContainer>
                      <ByClickingSign>{`By clicking “Sign up” you agree to Floyx’s `}</ByClickingSign>
                      <TermsOfService>Terms of Service,</TermsOfService>
                      <ByClickingSign>{` `}</ByClickingSign>
                      <TermsOfService>Privacy Policy</TermsOfService>
                      <ByClickingSign>{` and `}</ByClickingSign>
                      <TermsOfService>Cookie Policy.</TermsOfService>
                    </ByClickingSignContainer>
                  </ContainerFrame>
                </SelectionSignUp>
              </ConfirmationFrame>
            </CreateAccountText>
            <DividerLine>
              <OrLabelWrapper>
                <OrLabel />
              </OrLabelWrapper>
              <Or>Or</Or>
              <OrLabelContainer>
                <OrLabel />
              </OrLabelContainer>
            </DividerLine>
            <GoogleLogo>
              <ButtonGoogle>
                <RegisterWithYour>
                  Register with your email address only
                </RegisterWithYour>
                <ForMainstreamUsers>
                  For mainstream users, a one-click Google login is available
                  with keys securely backed up to Google Drive.
                </ForMainstreamUsers>
                <ConnectWalletLabel>
                  <FrameSignupWithGoogleLogo>
                    <PrivacyPolicy>
                      <SignUpWith>Sign up with Google</SignUpWith>
                    </PrivacyPolicy>
                    <MainMenuLinks>
                      <Image55Icon alt="" src="/image-55@2x.png" />
                    </MainMenuLinks>
                  </FrameSignupWithGoogleLogo>
                </ConnectWalletLabel>
                <MakeRegistrationSmooth>
                  Make registration smooth and secure with one click with
                  Connect Wallet
                </MakeRegistrationSmooth>
                <CreateAccountLabel
                  startIcon={
                    <img width="21px" height="21px" src="/wallet-1.png" />
                  }
                  disableElevation={true}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    color: "#0b081f",
                    fontSize: "16",
                    background: "#4285f4",
                    borderRadius: "0px 0px 0px 0px",
                    "&:hover": { background: "#4285f4" },
                    height: 50,
                  }}
                >
                  Connect Wallet
                </CreateAccountLabel>
              </ButtonGoogle>
            </GoogleLogo>
          </ExistingUsersText>
        </NameFrame>
      </RegisterNow>
    </RegisterContainerRoot>
  );
};

export default RegisterContainer;
