// import { AnimateDownload } from "../components/Animations/Download/download";
import React, { useEffect, useRef, useState } from "react";
import styled from '@emotion/styled';

const CtaIcon = styled.img`
  position: absolute;
  top: 104px;
  left: calc(50% - 651.45px);
  border-radius: 10px;
  width: 1157px;
  height: 477px;
  overflow: hidden;
  object-fit: cover;
`;
const DownloadAppChild = styled.img`
  position: absolute;
  top: 118.6px;
  left: 770px;
  width: 428px;
  height: 428px;
  object-fit: contain;
  z-index: 1;
`;
const DownloadTheApp = styled.b`
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
const EasyAndQuick = styled.div`
  align-self: stretch;
  position: relative;
  font-size: 18px;
  line-height: 27px;
  text-align: left;
  padding-right: 18px;
`;
const DownloadTheAppParent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 26px 0px;
`;
const BadgesIcon = styled.img`
  align-self: stretch;
  width: 119.7px;
  position: relative;
  max-height: 100%;
  overflow: hidden;
  flex-shrink: 0;
  min-height: 40px;
`;
const BadgesIcon1 = styled.img`
  align-self: stretch;
  width: 135px;
  position: relative;
  max-height: 100%;
  overflow: hidden;
  flex-shrink: 0;
  min-height: 40px;
`;
const BadgesParent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 20px 0px 0px;
  gap: 0px 19.3px;
`;
const TermsOfService = styled.div`
  position: absolute;
  top: 234px;
  left: 91px;
  width: 453px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 45px 0px;
  max-width: 100%;
  z-index: 1;
`;
const DownloadAppRoot = styled.div`
  align-self: stretch;
  height: 697.9px;
  position: relative;
  max-width: 100%;
  z-index: 2;
  margin-top: -24px;
  text-align: center;
  font-size: 50px;
  color: #fff;
  font-family: Poppins;
`;

const DownloadApp = () => {
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
      document.querySelector("#download-dd")?.classList.add("download-mobile");
     // document.querySelector("#id-I03221_1366701").classList.add("object");
    }
    else {
      document.querySelector("#download-dd")?.classList.remove("download-mobile");
      document.querySelector("#id-I03221_1366701").classList.add("download-mobile-reverse");
    };

  }, [isIntersecting]);
  return (
    // <><AnimateDownload /></>
    <DownloadAppRoot ref={ref}>
      <CtaIcon alt="" src="/cta@2x.png" />
      <img className="mobile-img" id="download-dd" loading="lazy" alt="" src="/group-3@2x.png" />
      <TermsOfService>
        <DownloadTheAppParent>
          <DownloadTheApp>Download the app</DownloadTheApp>
          <EasyAndQuick>
            Easy and quick access with website and mobile apps available on
            AppStore and GooglePlay.
          </EasyAndQuick>
        </DownloadTheAppParent>
        <BadgesParent>
          <BadgesIcon loading="lazy" alt="" src="/badges.svg" />
          <BadgesIcon1 loading="lazy" alt="" src="/badges-1.svg" />
        </BadgesParent>
      </TermsOfService>
    </DownloadAppRoot>
  );
};

export default DownloadApp;
