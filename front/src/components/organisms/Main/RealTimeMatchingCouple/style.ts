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

export const LoadingMatchingIcon = styled.div`
  font-size: 16px;
  color: rgb(89, 89, 89);

  & > div > * {
    display: inline-block;
    position: relative;
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
  & > div > .gym-name {
    width: 80px;
    height: 16px;
  }

  & > .gym-address {
    height: 50px;
    padding: 2px 5px;
    font-size: 12px;

    & > div {
      width: 100%;
      height: 16px;
    }
  }
`;

export const LoadingAvatarWrap = styled.div`
  display: inline-block;

  & + & {
    margin-left: 10px;
  }

  & > * {
    position: relative;
    background: rgba(190, 190, 190, 0.2);
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
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    display: inline-block;
    white-space: nowrap;
    border-radius: 5px;
    width: 62px;
    height: 62px;
  }

  & > div {
    border-radius: 2px;
    height: 24px;
  }
`;
