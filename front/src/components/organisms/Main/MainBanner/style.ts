import styled from 'styled-components';

export const BannerWrap = styled.section`
  position: relative;
  width: 100%;
`;

export const BannerImageWrap = styled.div`
  position: absolute;
  background-color: #b5b5b5;
  width: 100%;
  height: 400px;
`;

export const BannerImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-image: url('/images/banner.jpg');
  display: inline-block;
  width: 100%;
  max-width: 1280px;
  height: 400px;
`;

export const BannerHeader = styled.div`
  position: relative;
  display: inline-block;
  top: 0;
  width: 100%;
  max-width: 1280px;
  text-align: left;
  padding: 20px 18px;

  @media (min-width: 768px) {
    padding: 20px 128px;
  }
`;

export const BannerHeaderTitle = styled.div`
  margin-top: 20px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 800;

  & > .project-name {
    font-size: 32px;
    background: linear-gradient(
      to right,
      rgb(146, 84, 222) 0%,
      rgb(196, 29, 127) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

export const BannerContentWrap = styled.div`
  position: relative;
  display: inline-block;
  padding: 20px 18px;
  width: 100%;
  max-width: 1280px;

  @media (min-width: 768px) {
    padding: 20px 128px;
  }
`;

export const BannerContent = styled.div`
  text-align: left;
`;
