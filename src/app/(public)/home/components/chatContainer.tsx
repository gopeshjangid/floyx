import type { NextPage } from "next";
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import styled from '@emotion/styled';
import { ChatAnimation } from '../components/Animations/ChatsAnimations/chatAnimations'

const PrivateMessaging = styled.b`
  align-self: stretch;
  position: relative;
  letter-spacing: -0.02em;
  line-height: 120%;
  @media screen and (max-width: 800px) {
    font-size: 40px;
    line-height: 48px;
  }
  @media screen and (max-width: 450px) {
    font-size: 30px;
    line-height: 36px;
  }
`;
const UseOurInternal = styled.div`
  flex: 1;
  position: relative;
  line-height: 27px;
  display: inline-block;
  max-width: 100%;
`;
const Vector = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 11px;
  box-sizing: border-box;
  max-width: 100%;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
`;
const PrivateMessagingParent = styled.div`
  width: 462px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 23px 0px;
  max-width: 100%;
`;
const Frame = styled.img`
  height: 368px;
  width: calc(100% - 20px);
  position: absolute;
  margin: 0 !important;
  top: 10px;
  right: 10px;
  left: 10px;
  max-width: 100%;
  overflow: hidden;
  object-fit: cover;
`;
const ChatHead = styled.div`
  height: 388px;
  width: 333px;
  margin: 0 !important;
  position: absolute;
  right: -186px;
  bottom: -369px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  box-sizing: border-box;
  z-index: 2;
`;
const Group = styled.div`
  width: 632px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 36px 0px;
  box-sizing: border-box;
  position: relative;
  max-width: 100%;
`;
const Chat = styled.div`
  width: 47px;
  position: relative;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 450px) {
    font-size: 16px;
  }
`;
const Line = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
  text-align: center;
`;
const LabelFrameIcon = styled.img`
  align-self: stretch;
  height: 63px;
  position: relative;
  max-width: 100%;
  overflow: hidden;
  flex-shrink: 0;
  object-fit: contain;
`;
const TextFrame = styled.div`
  height: 8px;
  width: 8px;
  position: relative;
  border-radius: 50%;
  background-color: #fff;
`;
const GroupFrame = styled.div`
  width: 6px;
  height: 6px;
  position: relative;
  border-radius: 50%;
  background-color: #939393;
`;
const NameUsernameFrameEmailaddre = styled.div`
  height: -34.5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1px 0px 0px;
  box-sizing: border-box;
`;
const Heyya = styled.div`
  width: 36px;
  position: relative;
  display: none;
`;
const TypingComponent = styled.div`
  height: 1px;
  border-radius: 16px 16px 16px 1px;
  background-color: #2f2f32;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 20px;
  box-sizing: border-box;
  gap: 0px 4px;
  transform: rotate(180deg);
  opacity: 0;
  font-size: 12px;
  color: #fff;
`;
const MyProfilePic = styled.img`
  width: 47px;
  height: 47px;
  position: relative;
  object-fit: cover;
`;
const Checkbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 4px 0px 0px;
`;
const TwitterTelegramDiscordInsta = styled(TextField)`
  border: none;
  background-color: transparent;
  height: 100%;
  width: 612px;
  position: absolute;
  margin: 0 !important;
  top: 0px;
  bottom: 0px;
  left: 0px;
`;
const MessageToMichele = styled.div`
  position: relative;
`;
const TermsPrivacyCookiesFrame = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 36px 0px 0px;
  z-index: 1;
`;
const Rectangle1 = styled.div`
  width: 205px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 15px 0px 0px;
  box-sizing: border-box;
`;
const SignUpButtonGroup = styled.img`
  width: 22px;
  height: 22.3px;
  position: relative;
  z-index: 1;
`;
const EmailAddress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px 0px 0px;
`;
const PasswordInputFrame = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  border-radius: 5px;
  background: linear-gradient(92.09deg, #a561ff, #9881fe 32.36%, #5798ff);
`;
const PaperPlaneIcon = styled.img`
  position: absolute;
  height: 40%;
  width: 40%;
  top: 30.91%;
  right: 30.91%;
  bottom: 29.09%;
  left: 29.09%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  z-index: 1;
`;
const PasswordInputFrameParent = styled.button`
  cursor: pointer;
  border: none;
  padding: 0;
  background-color: transparent;
  height: 55px;
  flex: 1;
  position: relative;
`;
const Name1 = styled.div`
  width: 121px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 44px;
`;
const LegalFrame = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0px 0px 0px 30px;
  box-sizing: border-box;
  position: relative;
  min-width: 326px;
  max-width: 100%;
  gap: 20px;
  @media screen and (max-width: 800px) {
    flex-wrap: wrap;
  }
`;
const CheckboxParent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 14px;
  max-width: 100%;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.3);
  font-family: Poppins;
`;
const LabelFrame = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 20px 0px;
  max-width: 100%;
`;
const AutoLayoutHorizontal = styled.div`
  flex: 1;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 30px;
  box-sizing: border-box;
  max-width: 100%;
`;
const Message = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
`;
const Chat1 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 186px 0px 185px;
  box-sizing: border-box;
  max-width: 100%;
  z-index: 1;
  text-align: left;
  font-size: 20px;
  color: #8a8f98;
  font-family: Inter;
  @media screen and (max-width: 800px) {
    padding-top: 121px;
    padding-bottom: 120px;
    box-sizing: border-box;
  }
`;
const Groups = styled.b`
  width: 182px;
  position: relative;
  letter-spacing: -0.02em;
  line-height: 120%;
  display: inline-block;
  z-index: 2;
  @media screen and (max-width: 800px) {
    font-size: 40px;
    line-height: 48px;
  }
  @media screen and (max-width: 450px) {
    font-size: 30px;
    line-height: 36px;
  }
`;
const BlogFAQSupport = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
`;
const CreateAGroup = styled.div`
  align-self: stretch;
  position: relative;
  font-size: 18px;
  line-height: 27px;
  color: rgba(255, 255, 255, 0.7);
  z-index: 1;
`;
const CompanyBrandAssets = styled.div`
  width: 440px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 23px 0px;
  max-width: 100%;
`;
const Wallet = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
  box-sizing: border-box;
  max-width: 100%;
`;
const Line1 = styled.div`
  width: 808px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  max-width: 100%;
`;
const RectangleRoot = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 26px 0px 20px;
  box-sizing: border-box;
  max-width: 100%;
  text-align: center;
  font-size: 50px;
  color: #fff;
  font-family: Poppins;
`;
import React, { useEffect, useRef, useState } from "react";

const Rectangle: NextPage = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-300px" }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting) {
      document.querySelector("#chat2").classList.add("chatScroll");
      //document.querySelector("#id-I03221_1366701").classList.add("object");
    }
    else {
       document.querySelector("#chat2").classList.remove("chatScroll");
      // document.querySelector("#id-I03221_1366701").classList.remove("object");
    };

  }, [isIntersecting]);
  return (
    <RectangleRoot ref={ref}>
      <Line1>
        <Group>
          <PrivateMessagingParent>
            <PrivateMessaging>Private Messaging</PrivateMessaging>
            <Vector>
              <UseOurInternal>{`Use our internal encrypted messenger, which is the only one in the world that doesn't store data! `}</UseOurInternal>
            </Vector>
          </PrivateMessagingParent>
          <ChatHead>
            <Frame loading="lazy" alt="" src="/frame-427320687-2@2x.png" />
          </ChatHead>
        </Group>
       
        <Chat1>
          <Message>
            <AutoLayoutHorizontal>
              <LabelFrame>
                <Line>
                  <Chat>Chat</Chat>
                </Line>
                <div id="chat2" className="slideDiv">
                  <LabelFrameIcon alt="" src="/label-frame@2x.png" />
                <LabelFrameIcon  className="" alt="" src="/chat2.png" /> <LabelFrameIcon alt="" src="/chat3.png" />
                <LabelFrameIcon alt="" src="/chat4.png" />
                </div>
                <TypingComponent>
                  <TextFrame />
                  <NameUsernameFrameEmailaddre>
                    <GroupFrame />
                  </NameUsernameFrameEmailaddre>
                  <NameUsernameFrameEmailaddre>
                    <GroupFrame />
                  </NameUsernameFrameEmailaddre>
                  <Heyya>Heyya</Heyya>
                </TypingComponent>
                <CheckboxParent>
                  <Checkbox>
                    <MyProfilePic
                      loading="lazy"
                      alt=""
                      src="/my-profile-pic@2x.png"
                    />
                  </Checkbox>
                  <LegalFrame>
                    <TwitterTelegramDiscordInsta
                      variant="outlined"
                      sx={{
                        "& fieldset": { border: "none" },
                        "& .MuiInputBase-root": {
                          height: "55px",
                          backgroundColor: "#1b1830",
                          borderRadius: "5px",
                        },
                        width: "612px",
                      }}
                    />
                    <Rectangle1>
                      <TermsPrivacyCookiesFrame>
                        <MessageToMichele>
                          Message to Michele...
                        </MessageToMichele>
                      </TermsPrivacyCookiesFrame>
                    </Rectangle1>
                    <Name1>
                      <EmailAddress>
                        <SignUpButtonGroup
                          alt=""
                          src="/sign-up-button-group.svg"
                        />
                      </EmailAddress>
                      <PasswordInputFrameParent>
                        <PasswordInputFrame />
                        <PaperPlaneIcon alt="" src="/paperplane.svg" />
                      </PasswordInputFrameParent>
                    </Name1>
                  </LegalFrame>
                </CheckboxParent>
              </LabelFrame>
            </AutoLayoutHorizontal>
          </Message>
        </Chat1>
        <Wallet>
          <CompanyBrandAssets>
            <BlogFAQSupport>
              <Groups>Groups</Groups>
            </BlogFAQSupport>
            <CreateAGroup>{`Create a group, add dedicated channels and manage everything in an unprecedented way! `}</CreateAGroup>
          </CompanyBrandAssets>
        </Wallet>
      </Line1>
    </RectangleRoot>
  );
};

export default Rectangle;
