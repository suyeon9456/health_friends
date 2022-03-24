import styled from 'styled-components';

export const MatchingCoupleWrap = styled.section`
  position: relative;
  width: 100%;
`;

export const MatchingCoupleHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    to right,
    rgb(146, 84, 222) 0%,
    rgb(196, 29, 127) 100%
  );
  width: 100%;
  height: 160px;
  padding: 20px 18px;
  @media (min-width: 768px) {
    padding: 20px 128px;
  }
  text-align: left;
`;

export const CoupleHeaderTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #fafafa;
`;

export const MatchingCoupleBody = styled.div`
  position: relative;
  padding: 20px 18px;
  @media (min-width: 768px) {
    padding: 20px 128px;
  }
`;

export const CoupleCardList = styled.div`
  width: 100%;
  display: grid;
  gap: 10px 20px;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  margin-top: 50px;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CoupleCard = styled.div`
  padding: 25px 10px;
  position: relative;
  height: 220px;
  background-color: #ffffff;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 3%) 0px 5px 16px 0px;
  & > .avatar-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export const NoDataCard = styled.div`
  position: relative;
  width: 100% !important;
  height: 120px;
  background-color: #ffffff;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 3%) 0px 5px 16px 0px;
  display: flex;
  align-items: center;
`;

export const NoDataContent = styled.div`
  width: 100%;
`;

export const NoDataIconWrap = styled.div`
  text-align: center;
  width: 100%;
`;

export const NoDataText = styled.div`
  text-align: center;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  color: #00000040;
`;

export const AvatarWrap = styled.div`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  & + & {
    margin-left: 10px;
  }

  & > div {
    font-size: 14px;
    color: rgb(89, 89, 89);
  }
`;

export const MatchingIcon = styled.div`
  font-size: 16px;
  color: rgb(89, 89, 89);
  & > div > .gym-name {
    font-size: 14px;
    font-weight: 600;
  }

  & > .gym-address {
    height: 50px;
    padding: 2px 5px;
    font-size: 12px;
  }
`;
