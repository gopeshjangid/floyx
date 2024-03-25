import styled from '@emotion/styled';
import { Button } from "@mui/material";

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
const InnerContainer = styled.div`
  // width: 640px;
  // display: flex;
  // flex-direction: column;
   align-items: center;
  // justify-content: flex-start;
  // gap: 47px 0px;
  // min-width: 640px;
  // max-width: 100%;
  // z-index: 1;
  // @media screen and (max-width: 1350px) {
  //   flex: 1;
  // }
  // @media screen and (max-width: 800px) {
  //   gap: 23px 0px;
  //   min-width: 100%;
  // }

position: relative;
    left: 0px;
   width: 788px;
  display: flex;
  flex-direction: column;
  //align-items: flex-start;
  justify-content: flex-start;
  gap: 45px 0px;
  max-width: 100%;
  @media screen and (max-width: 450px) {
    gap: 22px 0px;
  }
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
const HeadingContainer = styled.div`
  width: 442px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 29px 0px;
  max-width: 100%;
  @media screen and (max-width: 450px) {
    display: flex;
   justify-content:center;
   align-items:centre;;
  }
`;
const Heading1 = styled.b`
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
    display: flex;
    justify-content:center;
    align-items:centre;;
  }
`;
const Button1 = styled(Button)`
  height: 58px;
  width: 126px;
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
const IBeam = styled.div`
  height: 24px;
  width: 2px;
  position: relative;
  border-right: 2px solid #eff0fa;
  box-sizing: border-box;
  display: none;
`;
const Heading2 = styled.div`
  align-self: stretch;
  height: 47px;
  position: relative;
  font-size: 18px;
  line-height: 27px;
  color: rgba(255, 255, 255, 0.7);
  display: inline-block;
  flex-shrink: 0;
  @media screen and (max-width: 450px) {
    // display: flex;
    justify-content:center;
    align-items:centre;;
    // padding:10px 10px;
    margin:10px 10px;
  }
`;
const SubContainer = styled.div`
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
const ContainernameInput = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 16px;
  // padding: 0px 8px;
  max-width: 100%;
  text-align: left;
  font-family: Poppins;
  @media screen and (max-width: 800px) {
    flex-wrap: wrap;
  }
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
const Div = styled.div`
  width: 7px;
  position: relative;
  letter-spacing: 1.5px;
  line-height: 16px;
  text-transform: uppercase;
  font-weight: 600;
  display: none;
`;
const VideoLive = styled.div`
  align-self: stretch;
  width: 81px;
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
const GeneralControls = styled.div`
  width: 260px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0px 16px;
  padding: 0px 2px;
`;
const Icon1 = styled.img`
  
    
    height: 10px;
    width: 10px;
    border-radius: 50%;
    position: relative;
    top: 2px;
    background-color: #ffffff;
    margin: 2px;
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
const GoLive = styled.div`
  align-self: stretch;
  width: 61px;
  position: relative;
  letter-spacing: 0.5px;
  line-height: 24px;
  font-weight: 600;
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
const Heading = styled.div`
  align-self: stretch;
  flex: 1;
  position: relative;
  letter-spacing: 0.25px;
  line-height: 20px;
  font-weight: 600;
`;
const TextContainer = styled.div`
  height: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  opacity: 1;
`;
const CrossIcon = styled.img`
  height: 20px;
  width: 20px;
  position: relative;
  object-fit: cover;
  display: none;
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
const FieldContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0px 3px;
  max-width: 100%;
`;
const ImageIcon2 = styled.img`
  height: 32px;
  width: 32px;
  position: relative;
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
const InputField = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 324px;
  max-width: 100%;
`;
const ChipContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  gap: 4px 0px;
`;
const InputText = styled.div`
  position: relative;
  letter-spacing: 0.5px;
  line-height: 24px;
`;
const ImageAnimateWrap = styled.div`
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
const OverflowMoreDotsVertica = styled.img`
  height: 24px;
  width: 24px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
`;
const Chip = styled.button`
  cursor: pointer;
  border: 1px solid #1d1f27;
  background-color: #0b081f;
  align-self: stretch;
  width: 178px;
  border-radius: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const InputContainerFrame = styled.img`
  height: 48px;
  width: 1px;
  position: relative;
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
const TextBox = styled.div`
  height: 24px;
  width: 61px;
  display: none;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
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
const IconButtonWrap = styled.div`
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
   @media screen and (max-width: 450px) {
  // padding: 20px;
  }
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
const ImageContainerBg = styled.img`
  align-self: stretch;
  //height: 588.1px;
  position: absolute;
  left:0px;
  top:2332px;
  //max-width: 100%;
  overflow: hidden;
  flex-shrink: 0;
  object-fit: contain;
  @media screen and (max-width: 1350px) {
    align-self: stretch;
    width: auto;
  }
`;
const ImageContainerBg2 = styled.img`
  // align-self: stretch;
  //     bottom: 1200px;
  //   left: 567px;
  // margin:0px;
  // height: 588.1px;
  // position: relative;
  // max-width: 100%;
  // overflow: hidden;
  // flex-shrink: 0;
  // object-fit: contain;

    width: 240px !important;
    -webkit-align-self: stretch;
    -ms-flex-item-align: stretch;
    align-self: stretch;
    top: 2152px;
    right: -2px;
    margin: 0px;
    /* height: 588.1px; */
    position: absolute;
    max-width: 100%;
    overflow: hidden;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    object-fit: contain;
  @media screen and (max-width: 1350px) {
    align-self: stretch;
    width: auto;
  }
`;
const VideoContainer =()=>{
    return(<MainContainer>
          <ImageContainerBg  src="/Group341.png" />
        {/* <ImageContainer>
        </ImageContainer> */}
        <InnerContainer>
          <HeadingContainer>
            <Heading1>Videos</Heading1>
            <Heading2>
              Create interesting videos, launch a live stream and let your
              channel grow.
          </Heading2>
          
          </HeadingContainer>
          <SubContainer>
            <VideoLiveParent>
              <VideoLive>
                
                <TextContainer className="blink">
                
                  <Icon1   />
                <Heading > &nbsp; LIVE</Heading>
               
                <CrossIcon  src="/cross@2x.png" /> 


                </TextContainer>
                
               
              </VideoLive>
              <Chip>
                <TextContainer1>
                  <ImageAnimateWrap>
                    
                    <span id="spin"></span> others in session
                  </ImageAnimateWrap>
                </TextContainer1>
              </Chip>
            </VideoLiveParent>

            <Containerpreview>
              <VideoTile>
                <FixedAspectRatioSpacer>
                  <AspectRatioKeeperRotated />
                </FixedAspectRatioSpacer>
                <ImageIcon  src="/image@2x.png" />
              </VideoTile>
              <Unit>
                <GeneralControls>
                  <ChipContainer>
                    <IconButtonWrap>
                      <ImageIcon2  src="/icon-1.svg" />
                      <TextBox>
                        <GoLive>Go Live</GoLive>
                      </TextBox>
                      <InputContainerFrame
                        
                        src="/input-container-frame.svg"
                      />
                      <OverflowMoreDotsVertica
                        
                        src="/overflow-more-dots--vertical.svg"
                      />
                    </IconButtonWrap>
                    <Notification1>
                      <Div>5</Div>
                    </Notification1>
                    <Audio1>Audio</Audio1>
                  </ChipContainer>
                  <ChipContainer>
                    <IconButtonWrap>
                      <ImageIcon2  src="/icon-2.svg" />
                      <TextBox>
                        <GoLive>Go Live</GoLive>
                      </TextBox>
                      <InputContainerFrame
                        
                        src="/input-container-frame.svg"
                      />
                      <OverflowMoreDotsVertica
                        
                        src="/overflow-more-dots--vertical.svg"
                      />
                    </IconButtonWrap>
                    <Notification1>
                      <Div>5</Div>
                    </Notification1>
                    <Audio1>Audio</Audio1>
                  </ChipContainer>
                  <ActionButtondesktop1>
                    <IconButton2>
                      <ImageIcon2  src="/icon-3.svg" />
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
                    <ImageIcon2  src="/icon-4.svg" />
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
          </SubContainer>
        </InnerContainer>
          <ImageContainerBg2  src="/Group340.png" />
      </MainContainer>)
}
export default VideoContainer