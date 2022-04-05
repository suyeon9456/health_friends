import styled from 'styled-components';

export const LoadingCardCover = styled.div`
  margin-top: -1px;
  margin-right: -1px;
  margin-left: -1px;
  height: 180px;

  & > * {
    display: block;
    width: 100%;
  }

  & > div {
    height: 100%;
    border-radius: 8px 8px 0 0;
  }
`;

export const LoadingCard = styled.div`
  display: inline-block;
  width: 300px;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  position: relative;
  background: #fff;
  border-radius: 8px;

  & .lazyData {
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
`;

export const LoadingCardMeta = styled.div`
  margin: -4px 0;
  &::before {
    display: table;
    content: '';
  }
  &::after {
    display: table;
    clear: both;
    content: '';
  }
`;

export const LoadingAvatar = styled.div`
  position: relative;
  background: rgba(190, 190, 190, 0.2);
  overflow: hidden;
  width: 100%;
  height: 16px;
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
`;

export const LoadingCardBody = styled.div`
  padding: 24px;
  &::before {
    display: table;
    content: '';
  }
  &::after {
    display: table;
    clear: both;
    content: '';
  }
`;

export const LoadingMetaDate = styled.div`
  width: 120px;
  height: 12px;
`;

export const LoadingMetaTitle = styled.div`
  width: 90px;
  height: 25px;
`;

export const LoadingMetaDescription = styled.div`
  width: 100%;
  height: 16px;
`;

export const LoadingAction = styled.li`
  float: left;
  margin: 12px 0;
  flex-grow: 1;

  & > span {
    width: 22px;
    height: 22px;
  }
`;
