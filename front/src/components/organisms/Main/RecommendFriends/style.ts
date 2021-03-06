import styled from 'styled-components';

export const FriendsWrap = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 40px;
  text-align: center;
`;

export const FriendsErrorWrap = styled.div`
  width: 100%;
  height: 313.3px;
  display: flex;
  align-items: center;
  border-radius: 5px;
`;

export const FriendsTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #fafafa;
  text-align: left;
  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

export const FriendsSubTitle = styled.div`
  padding-left: 24px;
  font-size: 14px;
  font-weight: 600;
  color: #fafafa;
  cursor: pointer;
  text-align: left;
`;

export const FriendsBody = styled.div`
  width: 90%;
  display: inline-block;
  @media (min-width: 768px) {
    width: 100%;
  }
`;

export const FriendsCardList = styled.div`
  width: 100%;
  margin-top: 20px;
  & .slick-slide {
    margin-bottom: 20px;
  }
`;

export const FriendsCardWrap = styled.div`
  width: 100%;
  padding: 10px;
`;

export const FriendsCard = styled.div`
  height: 200px;
  background-color: #ffffff;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 3%) 0px 5px 16px 0px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    border-color: transparent;
  }
`;

export const NoDataCard = styled.div`
  margin: 10px 0 !important;
  width: 100% !important;
  height: 200px;
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

export const CardAvatarWrap = styled.div`
  position: relative;
  width: 100%;
  height: 110px;
  padding: 10px;
  background-color: rgb(244, 245, 247);
  text-align: center;
  border-radius: 5px;
  & > span {
    font-size: 36px;
  }
`;

export const CardContentWrap = styled.div`
  padding: 10px;
  text-align: center;
`;

export const ContentTitile = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export const ContentDescription = styled.div`
  text-align: left;
  font-size: 12px;
  text-overflow: ellipsis;

  & > span {
    font-weight: bold;
  }
`;

export const FriendsErrorCard = styled.div`
  width: 100%;
  color: #cccccc;
  text-align: center;
`;

export const ErrorMessage = styled.div``;

export const ErrorIconWrap = styled.div`
  font-size: 28px;
`;

export const FriendsLoadingCard = styled.div`
  /* margin: 10px 0 !important;
  width: 200px !important; */
  height: 200px;
  background-color: #ffffff;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  & > div > .lazyData::before {
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
`;

export const LoadingAvatarWrap = styled.div`
  position: relative;
  width: 100%;
  height: 110px;
  padding: 10px;
  background-color: rgb(244, 245, 247);
  text-align: center;
  border-radius: 5px;
`;

export const LoadingAvatar = styled.span`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  position: relative;
  display: inline-block;
  white-space: nowrap;
  background: rgba(190, 190, 190, 0.2);
  border-radius: 5px;
  width: 82px;
  height: 82px;
  overflow: hidden;
`;

export const LoadingTitle = styled.span`
  display: inline-block;
  position: relative;
  width: 50px;
  height: 16px;
  background: rgba(190, 190, 190, 0.2);
  border-radius: 2px;
  overflow: hidden;
`;

export const LoadingDescription = styled.div`
  display: inline-block;
  position: relative;
  width: 170px;
  height: 16px;
  background: rgba(190, 190, 190, 0.2);
  border-radius: 2px;
  overflow: hidden;
`;

export const LoadingFallbackWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
`;
