import styled from 'styled-components';

export const MatchingCoupleWrap = styled.section`
  position: relative;
  width: 100%;
  `;

export const MatchingCoupleHeader = styled.div`
  /* background-color: #FF9100; */
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(to right,rgb(146,84,222) 0%,rgb(196,29,127) 100%);
  width: 100%;
  height: 160px;
  padding: 20px 128px;
  text-align: left;
`;

export const CoupleHeaderTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #FAFAFA;
`;

export const MatchingCoupleBody = styled.div`
  /* background-color: red; */
  position: relative;
  padding: 20px 128px;
`;

export const CoupleCardList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* align-content: space-between; */
  margin-top: 50px;
`;

export const CoupleCard = styled.div`
  position: relative;
  width: 300px;
  height: 120px;
  background-color: #ffffff;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 3%) 0px 5px 16px 0px;
  display: flex;
`;

export const AvatarWrap = styled.div`
  flex-grow: 2;
  /* flex-wrap: wrap;
  align-content: center; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  /* background-color: red; */
`;

export const MatchingIcon = styled.div`
  flex-grow: 1;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(89, 89, 89);
  & > .gym-name {
    font-size: 12px;
    font-weight: 600;
  }
`;