import styled from 'styled-components';

export const FooterWrap = styled.div`
  width: 100%;
  background-color: #ffffff;
  text-align: center;
`;

export const FooterContentWrap = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 1290px;
  `;

export const FooterContent = styled.div`
  display: flex;
  padding: 10px 0;
  width: 100%;
  font-size: 12px;
  /* font-weight: bold; */
  color: rgb(89,89,89);
  height: 120px;
  align-items: center;
`;

export const LogoWrap = styled.div`
  flex: 1 1 0;
  `;

export const InfoWrap = styled.div`
  flex: 2 1 0;
  text-align: left;
`;

export const BlogWrap = styled.div`
  flex: 1 1 0;
  display: flex;
  justify-content: center;
`;

export const IconWrap = styled.div`

  & + & {
    margin-left: 5px;
  } 
  & > a > .icon-back {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: #595959;
    border-radius: 50%;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.4;
    text-align: center;
  }
  & > a {
    text-decoration: none;
    color: #595959;
    & span {
      font-size: 24px;
    }
  }
`;
