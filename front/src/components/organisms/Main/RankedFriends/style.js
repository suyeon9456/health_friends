import styled from 'styled-components';

export const RankedFriendsWrap = styled.section`
  width: 100%;
  text-align: left;
  padding: 20px 18px;
  @media (min-width: 768px) {
    padding: 20px 128px;
  }
`;

export const RankedFriendsHeader = styled.div`
  font-size: 24px;
  @media (min-width: 768px) {
    font-size: 32px;
  }
  font-weight: 800;
  color: rgb(89,89,89);
`;

export const RankedFriendsBody = styled.div`
  padding: 20px 0;
`;

export const RankCardList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 767px) {
    flex-wrap: wrap;
    align-content: flex-start;
  }
`;

export const RankCardWrap = styled.div`
  width: 450px;
  @media (min-width: 768px) {
    & + & {
      margin-left: 10px;
    }
  }
`;

export const RankTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: rgb(89,89,89);
`;

export const RankCard = styled.div`
  /* height: 300px; */
  height: 236px;
  background-color: #ffffff;
  border: 1px solid rgb(230, 230, 230);
  box-shadow: rgb(0 0 0 / 3%) 0px 5px 16px 0px;
  border-radius: 5px;

  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  border-bottom: 0;
  margin: 10px 0;
`;

export const RankItemWrap = styled.div`
  border-bottom: 1px solid #d9d9d9;
`;

export const RankItem = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  padding: 12px 16px;
  color: #000000d9;
  line-height: 1.5715;
  cursor: pointer;
  transition: all .3s,visibility 0s;
  font-weight: 600;

  & span {
    margin-right: 10px;
  }

  & a {
    color: #000000d9;
  }
`;

export const NoDataCard = styled.div`
  position: relative;
  width: 100% !important;
  height: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid rgb(230, 230, 230);
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
