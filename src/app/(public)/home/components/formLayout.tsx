import type { NextPage } from "next";
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import styled from '@emotion/styled';
import {AnimateForm} from "./Animations/Form/form"

const Frame = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  margin: 0 !important;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-radius: 10px;
  background-color: #0b081f;
  border: 1px solid #302d41;
  box-sizing: border-box;
`;
const CreateAGroup = styled.div`
  width: 138px;
  position: relative;
  line-height: 27px;
  background: linear-gradient(86.55deg, #ab59ff, #858fff 56.79%, #4d9aff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  z-index: 1;
`;
const CreateAGroupWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
  font-size: 18px;
`;
const FloyxIntroTextGroup = styled.div`
  align-self: stretch;
  flex: 1;
  position: relative;
  border-radius: 5px;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  z-index: 1;
`;
const GroupName = styled.div`
  position: relative;
`;
const GroupNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;
const EmailVerificationSection = styled(TextField)`
  border: none;
  background-color: transparent;
  align-self: stretch;
  height: 50px;
  font-family: Poppins;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.3);
`;
const FrameParent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px 0px;
  z-index: 1;
`;
const FrameChild = styled.textarea`
  border: none;
  background-color: #1b1830;
  height: 117px;
  width: auto;
  outline: none;
  align-self: stretch;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 13px 18px;
  box-sizing: border-box;
  font-family: Poppins;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.3);
`;
const Text1 = styled.div`
  align-self: stretch;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 25px 0px;
`;
const OutlineArrowsActionUplo = styled.img`
  height: 24px;
  width: 24px;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  flex-shrink: 0;
`;
const Line = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 36px 0px 36.5px;
`;
const SocialMediaIconsFrame = styled.div`
  margin: 0 !important;
  position: absolute;
  top: 135px;
  right: 171px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 13px 0px;
  z-index: 2;
  color: rgba(255, 255, 255, 0.3);
`;
const FrameText = styled.div`
  height: 589px;
  width: 441px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 29px 41px 45px 42px;
  box-sizing: border-box;
  position: relative;
  gap: 29px 0px;
  max-width: 100%;
  text-align: left;
  font-size: 16px;
  @media screen and (max-width: 800px) {
    padding-top: 20px;
    padding-bottom: 29px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 450px) {
    padding-left: 20px;
    box-sizing: border-box;
  }
`;
const AddAdmins = styled.div`
  height: 27px;
  position: relative;
  line-height: 27px;
  background: linear-gradient(86.55deg, #ab59ff, #858fff 56.79%, #4d9aff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;
const FrameItem = styled.div`
  align-self: stretch;
  height: 48px;
  border-radius: 10px;
  background-color: #1b1830;
  overflow: hidden;
  flex-shrink: 0;
  z-index: 0;
`;
const OutlineSearchMagnifer = styled.img`
  height: 24px;
  width: 24px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
`;
const Nor = styled.span``;
const Span = styled.span`
  color: #fff;
`;
const OutlineSearchMagniferParent = styled.div`
  margin: 0 !important;
  position: absolute;
  top: 12px;
  left: 18px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 12px;
  z-index: 1;
`;
const FrameDiv = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  gap: 10px 0px;
  text-align: left;
  font-size: 16px;
`;
const AddAdminsParent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 25px 0px;
`;
const FrameInner = styled.img`
  height: 64px;
  width: 68px;
  position: relative;
  object-fit: cover;
`;
const Nora = styled.div`
  align-self: stretch;
  position: relative;
  font-weight: 500;
`;
const Jaco = styled.div`
  height: 21px;
  flex: 1;
  position: relative;
  font-size: 14px;
  background: linear-gradient(92.09deg, #a561ff, #9881fe 32.36%, #5798ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;
const NoraParent = styled.div`
  height: 24px;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 0px 4px;
`;
const FrameParent1 = styled.div`
  width: 175px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0px 15px;
`;
const Text2 = styled.div`
  position: absolute;
  top: calc(50% - 8.5px);
  left: calc(50% - 18px);
  line-height: 100%;
  font-weight: 500;
`;
const Bttn = styled.div`
  height: 35px;
  width: 74px;
  position: relative;
  border-radius: 27px;
  background-color: #3e88f5;
  text-align: center;
  color: #100d26;
`;
const FrameParent2 = styled.div`
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
const LineDiv = styled.div`
  align-self: stretch;
  height: 1px;
  position: relative;
  border-top: 1px solid #3c394c;
  box-sizing: border-box;
`;
const Miky = styled.div`
  position: relative;
  font-size: 14px;
  background: linear-gradient(92.09deg, #a561ff, #9881fe 32.36%, #5798ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const NoviParent = styled.div`
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 0px 4px;
`;
const FrameParent3 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0px 15px;
`;
const FrameParent4 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 18px 0px;
  text-align: left;
  font-size: 16px;
  color: #fff;
`;
const FrameContainer = styled.div`
  width: 358px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 27px 0px;
  max-width: 100%;
`;
const GroupInner = styled.div`
  border-radius: 10px;
  background-color: #0b081f;
  border: 1px solid #302d41;
  box-sizing: border-box;
  overflow: hidden;
  display: none;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 24px 32px;
  max-width: 100%;
  color: rgba(255, 255, 255, 0.3);
`;
const EnterChannelName = styled.div`
  align-self: stretch;
  position: relative;
`;
const EnterChannelNameWrapper = styled.div`
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const Text3 = styled.div`
  position: relative;
  line-height: 100%;
  font-weight: 500;
  color: #3e88f5;
  text-align: center;
`;
const FrameParent5 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  @media screen and (max-width: 450px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;
const EnterAChannel = styled.div`
  width: 177px;
  position: absolute;
  margin: 0 !important;
  top: 13px;
  left: 18px;
  display: inline-block;
  z-index: 0;
`;
const EnterAChannelNameWrapper = styled.div`
  align-self: stretch;
  height: 50px;
  border-radius: 10px;
  background-color: #1b1830;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 13px 0px;
  box-sizing: border-box;
  position: relative;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.3);
`;
const FrameParent6 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px 0px;
  text-align: left;
  font-size: 16px;
`;
const FrameWrapper = styled.div`
  width: 358px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
`;
const GroupChild = styled.div`
  border-radius: 10px;
  background-color: #0b081f;
  border: 1px solid #302d41;
  box-sizing: border-box;
  overflow: hidden;
  display: none;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 24px 32px;
  min-height: 197px;
  max-width: 100%;
`;
const GroupRoot = styled.div`
  width: 1157px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
  box-sizing: border-box;
  max-width: 100%;
  z-index: 1;
  text-align: center;
  font-size: 18px;
  color: #d1d0d5;
  font-family: Poppins;
`;

const FormGroupLayout: NextPage = () => {
  return (
    <>
      <AnimateForm/>
    </>
    // <GroupRoot>
    //   <FrameText>
    //     <Frame />
    //     <CreateAGroupWrapper>
    //       <CreateAGroup>Create a group</CreateAGroup>
    //     </CreateAGroupWrapper>
    //     <Text1>
    //       <FloyxIntroTextGroup />
    //       <FrameParent>
    //         <GroupNameWrapper>
    //           <GroupName>Group name</GroupName>
    //         </GroupNameWrapper>
    //         <EmailVerificationSection
    //           placeholder="Enter group name"
    //           variant="outlined"
    //           sx={{
    //             "& fieldset": { border: "none" },
    //             "& .MuiInputBase-root": {
    //               height: "50px",
    //               backgroundColor: "#1b1830",
    //               borderRadius: "10px",
    //             },
    //             "& .MuiInputBase-input": { color: "rgba(255, 255, 255, 0.3)" },
    //           }}
    //         />
    //       </FrameParent>
    //       <FrameParent>
    //         <GroupNameWrapper>
    //           <GroupName>{`Description `}</GroupName>
    //         </GroupNameWrapper>
    //         <FrameChild
    //           placeholder="Enter group description"
    //           rows={6}
    //           cols={18}
    //         />
    //       </FrameParent>
    //     </Text1>
    //     <SocialMediaIconsFrame>
    //       <Line>
    //         <OutlineArrowsActionUplo
    //           loading="lazy"
    //           alt=""
    //           src="/outline--arrows-action--upload-minimalistic.svg"
    //         />
    //       </Line>
    //       <GroupName>Upload logo</GroupName>
    //     </SocialMediaIconsFrame>
    //   </FrameText>
    //   <GroupInner>
    //     <FrameContainer>
    //       <AddAdminsParent>
    //         <AddAdmins>Add admins</AddAdmins>
    //         <FrameDiv>
    //           <FrameItem />
    //           <OutlineSearchMagniferParent>
    //             <OutlineSearchMagnifer
    //               alt=""
    //               src="/outline--search--magnifer.svg"
    //             />
    //             <GroupName>
    //               <Nor>{`Nor `}</Nor>
    //               <Span>|</Span>
    //               <Nor>{` `}</Nor>
    //             </GroupName>
    //           </OutlineSearchMagniferParent>
    //         </FrameDiv>
    //       </AddAdminsParent>
    //       <FrameParent4>
    //         <FrameParent2>
    //           <FrameParent1>
    //             <FrameInner alt="" src="/frame-427320691@2x.png" />
    //             <NoraParent>
    //               <Nora>Nora</Nora>
    //               <Jaco>@Jaco</Jaco>
    //             </NoraParent>
    //           </FrameParent1>
    //           <Bttn>
    //             <Text2>Add</Text2>
    //           </Bttn>
    //         </FrameParent2>
    //         <LineDiv />
    //         <FrameParent2>
    //           <FrameParent3>
    //             <FrameInner alt="" src="/frame-427320693@2x.png" />
    //             <NoviParent>
    //               <Nora>Novi</Nora>
    //               <Miky>@miky</Miky>
    //             </NoviParent>
    //           </FrameParent3>
    //           <Bttn>
    //             <Text2>Add</Text2>
    //           </Bttn>
    //         </FrameParent2>
    //       </FrameParent4>
    //     </FrameContainer>
    //   </GroupInner>
    //   <GroupChild>
    //     <FrameWrapper>
    //       <AddAdminsParent>
    //         <AddAdmins>Add channels</AddAdmins>
    //         <FrameParent6>
    //           <FrameParent5>
    //             <EnterChannelNameWrapper>
    //               <EnterChannelName>Enter channel name</EnterChannelName>
    //             </EnterChannelNameWrapper>
    //             <Text3>{`Add channel `}</Text3>
    //           </FrameParent5>
    //           <EnterAChannelNameWrapper>
    //             <EnterAChannel>Enter a channel name</EnterAChannel>
    //           </EnterAChannelNameWrapper>
    //         </FrameParent6>
    //       </AddAdminsParent>
    //     </FrameWrapper>
    //   </GroupChild>
    // </GroupRoot>
  );
};

export default FormGroupLayout;
