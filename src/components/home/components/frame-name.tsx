import type { NextPage } from "next";
import styled from '@emotion/styled'
  ;

export type FrameNameType = {
  name1?: string;
  exDustinMax?: string;
};

const Name1 = styled.span``;
const Span = styled.span`
  color: #ff5757;
`;
const Name2 = styled.div`
  height: 24px;
  position: relative;
  display: inline-block;
`;
const NameAndUsernameFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;
const VuesaxlinearprofileIcon = styled.img`
  height: 23px;
  width: 23px;
  position: relative;
`;
const ExDustinMax = styled.div`
  position: relative;
`;
const FrameSignupWithGoogle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 8px;
`;
const EnterEmailAgain = styled.div`
  align-self: stretch;
  border-radius: 10px;
  background-color: #1b1830;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 13px 21px 11px 20px;
  gap: 20px;
  color: rgba(255, 255, 255, 0.3);
  @media screen and (max-width: 450px) {
    flex-wrap: wrap;
  }
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
const FrameNameRoot = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 0px 4px;
  box-sizing: border-box;
  max-width: 100%;
  text-align: left;
  font-size: 16px;
  color: #d1d0d5;
  font-family: Poppins;
`;

const FrameName: NextPage<FrameNameType> = ({ name1, exDustinMax }) => {
  return (
    <FrameNameRoot>
      <UsernameInputFrame>
        <NameAndUsernameFrame>
          <Name2>
            <Name1>{name1}</Name1>
            <Span>*</Span>
          </Name2>
        </NameAndUsernameFrame>
        <EnterEmailAgain>
          <FrameSignupWithGoogle>
            <VuesaxlinearprofileIcon
              loading="lazy"
              alt=""
              src="/vuesaxlinearprofile.svg"
            />
            <ExDustinMax>{exDustinMax}</ExDustinMax>
          </FrameSignupWithGoogle>
          <ExDustinMax>0/25</ExDustinMax>
        </EnterEmailAgain>
      </UsernameInputFrame>
    </FrameNameRoot>
  );
};

export default FrameName;
