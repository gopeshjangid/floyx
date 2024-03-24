'use client';
import styled from '@emotion/styled';
import { AnimateForm } from './Animations/Form/form';

const GroupContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
  box-sizing: border-box;
  max-width: 100%;
`;
const GroupOuterContainer = styled.div`
  width: 440px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 23px 0px;
  max-width: 100%;
`;
const GroupInnerContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px;
`;
const GHeading = styled.b`
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
const CreateAGroup = styled.div`
  align-self: stretch;
  position: relative;
  font-size: 18px;
  line-height: 27px;
  color: rgba(255, 255, 255, 0.7);
  z-index: 1;
`;
const FormGroupLayout = () => {
  return (
    <>
      {' '}
      <GroupContainer>
        <GroupOuterContainer>
          <GroupInnerContainer>
            <GHeading>Groups</GHeading>
          </GroupInnerContainer>
          <CreateAGroup>
            Create a group, add dedicated channels and manage everything in an
            unprecedented way!{' '}
          </CreateAGroup>
        </GroupOuterContainer>
      </GroupContainer>
      <div className="form-main-div">
        <AnimateForm />
      </div>
    </>
  );
};

export default FormGroupLayout;
