import type { NextPage } from "next";
import styled from '@emotion/styled'
import Link from "next/link";
import { Box, Tooltip, Typography } from "@mui/material";

const FrameGroupsChild = styled.div`
  height: 383px;
  width: 1440px;
  position: relative;
  background-color: #0b081e;
  display: none;
  max-width: 100%;
`;
const GroupIcon = styled.img`
  height: 37.6px;
  width: 32.4px;
  position: relative;
`;
const GroupIcon1 = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;
const SocialFiMarketplace = styled.img`
  position: absolute;
  top: 0.2px;
  left: 111.2px;
  width: 12.2px;
  height: 11.4px;
  z-index: 1;
`;
const LinksColumn = styled.div`
  align-self: stretch;
  height: 27.2px;
  position: relative;
`;
const VectorInstance = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 3.2000000000007276px 0px;
`;
const Group = styled.div`
  width: 168.9px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 13.2px;
  z-index: 5;
`;
const Products = styled.div`
  position: relative;
  line-height: 18.72px;
  text-transform: uppercase;
  font-weight: 500;
`;
const Launchpad = styled(Link)`
  margin: 0;
  display:block;
`;
const LaunchpadSocialfiMarketplaceContainer = styled.div`
  position: relative;
  font-size: 15px;
  line-height: 30px;
  color: #848895;
`;
const ProductMenu = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 13px 0px;
  min-width: 95px;
  max-width: 97px;
`;
const CompanyHub = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 13px 0px;
  min-width: 100px;
  max-width: 102px;
`;
const BlogFaqSupportContainer = styled.div`
  align-self: stretch;
  position: relative;
  font-size: 15px;
  line-height: 30px;
  color: #848895;
`;
const RegisterWithEmailOnlyMains = styled.div`
  width: 825px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 80px;
  max-width: 100%;
  z-index: 5;
  @media screen and (max-width: 1150px) {
    gap: 0px 40px;
  }
  @media screen and (max-width: 800px) {
    flex-wrap: wrap;
  }
  @media screen and (max-width: 450px) {
    gap: 20px 20px;
  }
`;
const FrameGroupsRoot = styled.footer`
  background-color: #0b081e;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 68px 117px 73px 141px;
  box-sizing: border-box;
  max-width: 100%;
  gap: 20px;
  z-index: 4;
  text-align: left;
  font-size: 16px;
  color: #fff;
  font-family: Poppins;
  @media screen and (max-width: 1350px) {
    flex-wrap: wrap;
  }
  @media screen and (max-width: 800px) {
    padding-left: 70px;
    padding-right: 58px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 450px) {
    padding: 44px 20px 47px;
    box-sizing: border-box;
  }
`;

const FrameGroups: NextPage = () => {
  return (
    <Box width={'100%'}><FrameGroupsRoot id="footer">
      <FrameGroupsChild />
      <Group>
        <GroupIcon loading="lazy" alt="" src="/group.svg" />
        <VectorInstance>
          <LinksColumn>
          <Launchpad href={"/"}>
            <GroupIcon1 alt="" src="/group-1.svg" />
          </Launchpad>
           
            <SocialFiMarketplace alt="" src="/vector-4.svg" />
          </LinksColumn>
        </VectorInstance>
        
      </Group>
      
      <RegisterWithEmailOnlyMains>
        <ProductMenu>
          <Products>Products</Products>
          <LaunchpadSocialfiMarketplaceContainer>
           <Launchpad href={'/register'}>{`SocialFi `}</Launchpad>
            <Tooltip title='coming soon'><Launchpad href={'/#'}>{`Launchpad `}</Launchpad></Tooltip>
            <Tooltip title='coming soon'><Launchpad href={'/#'}>{`Marketplace `}</Launchpad></Tooltip>
            <Tooltip title='coming soon'><Launchpad href={'/#'}>NFT Airdrops</Launchpad></Tooltip>
            <Tooltip title='coming soon'><Launchpad href={'/#'}>{`DEX Buy `}</Launchpad></Tooltip>
          </LaunchpadSocialfiMarketplaceContainer>
        </ProductMenu>
        <CompanyHub>
          <Products>Company</Products>
          <LaunchpadSocialfiMarketplaceContainer>
            <Launchpad target="__blank" href={'https://drive.google.com/drive/folders/1wBkaNXn_C6bCxgfSbAn40ukjZljLWAdB?usp=sharing'}>Brand Assets</Launchpad>
          </LaunchpadSocialfiMarketplaceContainer>
        </CompanyHub>
        <CompanyHub>
          <Products>Resources</Products>
          <BlogFaqSupportContainer>
            <Launchpad target="__blank" href={'https://medium.com/@floyxcom'}>Blog</Launchpad>
            <Launchpad href={'mailto:support@floyx.com'}>Support</Launchpad>
          </BlogFaqSupportContainer>
        </CompanyHub>
        <CompanyHub>
          <Products>Social</Products>
          <BlogFaqSupportContainer>
            <Launchpad target="__blank" href={'https://twitter.com/floyxcom'}>Twitter</Launchpad>
            <Launchpad target="__blank" href={'https://www.linkedin.com/company/floyx'}>Linkedin</Launchpad>
            <Launchpad target="__blank"  href={'https://t.me/floyxofficial'}>Telegram</Launchpad>
            <Launchpad target="__blank"  href={'https://discord.com/invite/S3MrM8R7VM'}>Discord</Launchpad>
            <Launchpad target="__blank"  href={'https://www.instagram.com/floyxcom'}>Instagram</Launchpad>
            <Launchpad target="__blank"  href={'https://www.tiktok.com/@floyxcom'}>Tiktok</Launchpad>
            <Launchpad target="__blank"  href={'https://www.facebook.com/Floyxcom?mibextid=ZbWKwL'}>Facebook</Launchpad>
            <Launchpad target="__blank"  href={'https://www.youtube.com/@floyxcom'}>YouTube</Launchpad>
          </BlogFaqSupportContainer>
        </CompanyHub>
        <CompanyHub>
          <Products>Legal</Products>
          <BlogFaqSupportContainer>
            <Launchpad target="__blank" href="/termsOfService">Terms</Launchpad>
            <Launchpad target="__blank" href="/privacyPolicy">Privacy</Launchpad>
            <Launchpad target="__blank" href="/cookiePolicy">Cookies</Launchpad>
          </BlogFaqSupportContainer>
        </CompanyHub>
      </RegisterWithEmailOnlyMains>
    </FrameGroupsRoot>
    <Box textAlign={'center'} width={'100%'} pt={2} pb={2}>
         <Typography sx={{opacity: .6}} variant="subtitle2">© 2024 Powered by Floyx, LLC</Typography>
      </Box>
    </Box>
  );
};

export default FrameGroups;
