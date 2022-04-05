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
  color: rgb(89, 89, 89);
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
    justify-content: center;
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
  color: rgb(89, 89, 89);
`;

export const RankCard = styled.div`
  /* height: 300px; */
  /* height: 236px; */
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
  font-feature-settings: 'tnum';
  border-bottom: 0;
  margin: 10px 0;
`;

export const RankItemWrap = styled.div`
  border-bottom: 1px solid #d9d9d9;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  background-color: #ffffff;
  margin-bottom: 4px;
  box-sizing: border-box;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 20px 20px -15px rgb(0 0 0 / 5%);
  }
`;

export const RankItem = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  padding: 12px 16px;
  color: #000000d9;
  line-height: 1.5715;
  cursor: pointer;
  transition: all 0.3s, visibility 0s;
  font-weight: 600;

  & span {
    margin-right: 10px;
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

export const LoadingRankWrap = styled.div`
  border-bottom: 1px solid #d9d9d9;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  background-color: #ffffff;
  margin-bottom: 4px;
  box-sizing: border-box;
`;

export const LoadingRankItem = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  padding: 12px 16px;
  color: #000000d9;
  line-height: 1.5715;

  & > * {
    display: inline-block;
    position: relative;
    height: 22px;
    background: rgba(190, 190, 190, 0.2);
    border-radius: 2px;
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgb(190 190 190 / 0%) 25%,
        rgba(129, 129, 129, 0.2) 35%,
        rgb(190 190 190 / 0%) 65%
      );
      animation: loading 2.5s infinite;
      @keyframes loading {
        0% {
          transform: translateX(-150%);
        }
        50% {
          transform: translateX(-60%);
        }
        100% {
          transform: translate(150%);
        }
      }
    }
  }

  & > span {
    margin-right: 10px;
    width: 16px;
  }
  & > div {
    width: 360px;
  }
`;
