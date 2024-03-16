import type { NextPage } from "next";
import styled from '@emotion/styled'
  ;

const FrameChild = styled.header`
  height: 75px;
  width: 1444px;
  position: relative;
  background-color: rgba(8, 6, 23, 0.89);
  backdrop-filter: blur(9px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-sizing: border-box;
  display: none;
  max-width: 100%;
`;
const FloyxProducts = styled.div`
  position: relative;
  white-space: nowrap;
`;
const Username = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 36px;
  max-width: 100%;
  @media screen and (max-width: 800px) {
    display: none;
  }
  @media screen and (max-width: 450px) {
    gap: 0px 18px;
  }
`;
const Registration = styled.div`
  flex: 1;
  position: relative;
`;
const ContactUs = styled.div`
  flex: 1;
  position: relative;
  white-space: nowrap;
`;
const Username1 = styled.div`
  width: 329px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 36px;
  max-width: 100%;
  @media screen and (max-width: 450px) {
    gap: 0px 18px;
  }
`;
const Name1 = styled.div`
  width: 1070px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  max-width: 100%;
  z-index: 1;
  @media screen and (max-width: 800px) {
    width: 640px;
  }
`;
const RectangleParentRoot = styled.div`
  margin-top: -1px;
  align-self: stretch;
  background-color: rgba(8, 6, 23, 0.89);
  backdrop-filter: blur(9px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 25px 140px 23px;
  top: 0;
  z-index: 99;
  position: sticky;
  max-width: 100%;
  text-align: left;
  font-size: 16px;
  color: #fff;
  font-family: Poppins;
  @media screen and (max-width: 1350px) {
    padding-left: 70px;
    padding-right: 70px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 800px) {
    padding-left: 35px;
    padding-right: 35px;
    box-sizing: border-box;
  }
`;

const FrameComponent1: NextPage = () => {
  return (
    <RectangleParentRoot>
      <FrameChild />
      <Name1>
        <Username>
          <FloyxProducts>Floyx Products</FloyxProducts>
          <FloyxProducts>Mobile Application</FloyxProducts>
          <FloyxProducts>Crypto Area</FloyxProducts>
        </Username>
        <Username1>
          <Registration>Registration</Registration>
          <ContactUs>Contact Us</ContactUs>
          <FloyxProducts>About Us</FloyxProducts>
        </Username1>
      </Name1>
    </RectangleParentRoot>
  );
};

export default FrameComponent1;
