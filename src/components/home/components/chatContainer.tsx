"use client";
import { TextField } from "@mui/material";
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from "react";

const Heading1 = styled.b`
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
const Heading2 = styled.div`
  flex: 1;
  position: relative;
  line-height: 27px;
  display: inline-block;
  max-width: 100%;
`;
const BgWrapper = styled.div`
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
const HeadingContainer = styled.div`
  width: 462px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 23px 0px;
  max-width: 100%;
`;
const BgImageWrap = styled.img`

    height: 368px;
    /* width: calc(100% - 20px); */
    position: absolute;
    margin: 0 !important;
    top: -19px;
    right: 0px;
    left: -70px;
    max-width: 100%;
    overflow: hidden;
    object-fit: cover;
    display:none;
     @media screen and (max-width: 1604px) {
      display:block;
    position: relative;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    top: 172px;
    right: 0;
    left: 640px;
  }
    @media screen and (max-width: 768px) {
       position: relative;
         display:block;
    justify-content: center;
   top: 0px;
   right: 0px;
   left: 0px;
  }
  
  // top: 10px;
  // right: 10px;
  // left: 10px;
 
`;
const ChatHeadBgWrap = styled.div`

    height: 388px;
    width: 338px;
    margin: 0 !important;
    position: absolute;
    right: -12px;
    bottom: 4923px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-align-items: flex-start;
    -webkit-box-align: flex-start;
    -ms-flex-align: flex-start;
    align-items: flex-start;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    padding: 10px;
    box-sizing: border-box;
     @media screen and (max-width: 1604px) {
       position: relative;
    justify-content: center;
   top: 0px;
   right: 0px;
   left: 0px;
  }
     @media screen and (max-width: 768px) {
       position: static;
       width: 100%;
    justify-content: center;
   top: 0px;
   right: 0px;
   left: 0px;
  }
   
`;
const ChatHeadContainer = styled.div`
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
const Heading = styled.div`
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
const BgLine = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
  text-align: center;
`;
const ChatBoxImage = styled.img`
  align-self: stretch;
  height: 63px;
  position: relative;
  max-width: 100%;
  overflow: hidden;
  flex-shrink: 0;
  object-fit: contain;
`;
const BgTypingFrame = styled.div`
  height: 8px;
  width: 8px;
  position: relative;
  border-radius: 50%;
  background-color: #fff;
`;
const BgTypingInnerContainer = styled.div`
  width: 6px;
  height: 6px;
  position: relative;
  border-radius: 50%;
  background-color: #939393;
`;
const TypingInnerContainer = styled.div`
  height: -34.5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1px 0px 0px;
  box-sizing: border-box;
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
const SendBoxOutline = styled(TextField)`
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
const InnerText = styled.div`
  position: relative;
   @media screen and (max-width: 440px) {
    font-size:12px;
  }
`;
const SendBoxInner = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 36px 0px 0px;
  z-index: 1;
  @media screen and (max-width: 440px) {
    padding: 0px 3px 0px 0px;
  }
`;
const SendBox = styled.div`
  width: 205px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 15px 0px 0px;
  box-sizing: border-box;
  @media screen and (max-width: 440px) {
    //width: 100%;
  }
`;
const SendBtn = styled.img`
  width: 22px;
  height: 22.3px;
  position: relative;
  z-index: 1;
`;
const SendButtonInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px 0px 0px;
  @media screen and (max-width: 440px) {
    width: 40px;
  }
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
const SendButtonContainer = styled.div`
  width: 121px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 44px;
  @media screen and (max-width: 440px) {
    gap: 0px 0px;
  }
`;
const SendBoxContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0px 0px 0px 30px;
  box-sizing: border-box;
  position: relative;
  max-width: 100%;
  gap: 20px;
  @media screen and (max-width: 800px) {
    flex-wrap: wrap;
  }
  @media screen and (max-width: 440px) {
    flex-wrap: nowrap;
    width: 80%;
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
const LabelContainer = styled.div`
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
  @media screen and (max-width: 440px) {
    padding: 8px;;
  }
`;
const MessageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
`;
const ChatContainer = styled.div`


    width: 100%;
    /* -webkit-align-self: stretch; */
    -ms-flex-item-align: stretch;
    /* align-self: stretch; */
    /* display: -webkit-box; */
    /* display: -webkit-flex; */
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: column;
    -webkit-align-items: flex-start;
    -webkit-box-align: flex-start;
    -ms-flex-align: flex-start;
    align-items: flex-start;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    /* padding: 186px 0px 185px; */
    box-sizing: border-box;
    /* max-width: 100%; */
    z-index: 1;
    text-align: center;
    font-size: 20px;
    color: #8a8f98;
    font-family: Inter;
}
`;
const InnerContainer = styled.div`
  width: 808px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  max-width: 100%;
`;
const MainContainer = styled.div`
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
  @media screen and (max-width: 440px) {
    padding: 0px 5px 0px 5px;
  }
`;


const ChatBox = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-300px" }
    );

    if (ref?.current) { observer.observe(ref.current); }

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting) {
      document?.querySelector("#chat2")?.classList.add("chatScroll");
    }
    else {
      document?.querySelector("#chat2")?.classList.remove("chatScroll");
    };

  }, [isIntersecting]);
  return (
    <MainContainer ref={ref}>
      <InnerContainer>
        <ChatHeadContainer>
          <HeadingContainer>
            <Heading1>Private Messaging</Heading1>
            <BgWrapper>
              <Heading2>Use our internal encrypted messenger, which is the only one in the world that doesn't store data!</Heading2>
            </BgWrapper>
          </HeadingContainer>
        </ChatHeadContainer>
        <ChatContainer>
          <ChatHeadBgWrap>
            <BgImageWrap loading="lazy" alt="" src="/frame-427320687-2@2x.png" />

          </ChatHeadBgWrap>
          <MessageContainer>
            <AutoLayoutHorizontal>
              <LabelContainer>
                <BgLine>
                  <Heading>Chat</Heading>
                </BgLine>
                <div id="chat2" className="slideDiv">
                  <ChatBoxImage alt="" src="/label-frame@2x.png" />
                  <ChatBoxImage className="" alt="" src="/chat2.png" />
                  <ChatBoxImage alt="" src="/chat3.png" />
                  <ChatBoxImage alt="" src="/chat4.png" />
                </div>
                <TypingComponent>
                  <BgTypingFrame />
                  <TypingInnerContainer>
                    <BgTypingInnerContainer />
                  </TypingInnerContainer>
                  <TypingInnerContainer>
                    <BgTypingInnerContainer />
                  </TypingInnerContainer>
                </TypingComponent>
                <CheckboxParent>
                  <Checkbox>
                    <MyProfilePic
                      loading="lazy"
                      alt=""
                      src="/my-profile-pic@2x.png"
                    />
                  </Checkbox>
                  <SendBoxContainer>
                    <SendBoxOutline
                      sx={{
                        "& fieldset": { border: "none" },
                        "& .MuiInputBase-root": {
                          height: "55px",
                          backgroundColor: "#1b1830",
                          borderRadius: "5px",
                          border: '0px'
                        },
                        width: "612px",
                      }}
                    />
                    <SendBox>
                      <SendBoxInner>
                        <InnerText>
                          Message to Michele...
                        </InnerText>
                      </SendBoxInner>
                    </SendBox>
                    <SendButtonContainer>
                      <SendButtonInner>
                        <SendBtn
                          alt=""
                          src="/sign-up-button-group.svg"
                        />
                      </SendButtonInner>
                      <PasswordInputFrameParent>
                        <PasswordInputFrame />
                        <PaperPlaneIcon alt="" src="/paperplane.svg" />
                      </PasswordInputFrameParent>
                    </SendButtonContainer>
                  </SendBoxContainer>
                </CheckboxParent>
              </LabelContainer>
            </AutoLayoutHorizontal>
          </MessageContainer>
        </ChatContainer>
      
      </InnerContainer>
    </MainContainer>
  );
};

export default ChatBox;
