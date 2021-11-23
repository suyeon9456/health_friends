import styled from 'styled-components';

export const BannerWrap = styled.div`
  /* position: relative;
  display: inline-block; */
  width: 100%;
  /* max-width: 1280px; */
  height: 400px;
  /* text-align: center; */
  background-color: #B5B5B5;
  /* text-align: right; */
  /* background-image: url('/images/banner.jpg'); */
`;

export const BannerImageWrap = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  /* max-width: 1280px; */
  text-align: right;
  & > img {
    width: 100%;
    max-width: 1280px;
    height: 100%;
    object-fit: cover;
  }
`;

export const BannerContentWrap = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 1280px;
  bottom: 90%;
`;

export const BannerContent = styled.div`
  text-align: left;
  display: inline-block;
  position: relative;
  /* bottom: 90%; */
  width: 80%;
`;

export const ContentTitle = styled.div`
  margin-top: 20px;
  font-size: 32px;
  color: #ffffff;
  font-weight: 800;

  & > .project-name {
    font-size: 40px;
    background: linear-gradient(to right,rgb(146,84,222) 0%,rgb(196,29,127) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
