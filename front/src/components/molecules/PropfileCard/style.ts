import styled, { css } from 'styled-components';

export const Card = styled.div`
  display: flex;
  width: 400px;
  height: 70px;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  background: #fff;
  border-radius: 2px;

  & > div {
    display: flex;
    align-items: center;
  }

  & .lazyData {
    position: relative;
    overflow: hidden;
    background: rgba(190, 190, 190, 0.2);
    border-radius: 2px;

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

export const CardCover = styled.div`
  padding: 10px 0;
  justify-content: center;
  flex-grow: 1;

  &::before {
    display: table;
    content: '';
  }
  &::after {
    display: table;
    clear: both;
    content: '';
  }

  & > img {
    width: 100px;
    height: 100%;
    border-radius: 2px 2px 0 0;
    vertical-align: middle;
    border-style: none;
    object-fit: contain;
  }
`;

export const CardBody = styled.div`
  padding: 10px 0;
  padding-left: 10px;
  flex-grow: 5;
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

export const CardMeta = styled.div`
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

export const MetaTitle = styled.div<{ isCheckedLike?: boolean }>`
  overflow: hidden;
  color: #000000d9;
  font-weight: 500;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;

  & > span {
    color: #00000073;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 5px;

    &:hover {
      color: #9254de;
    }
    ${({ isCheckedLike }) =>
      isCheckedLike &&
      css`
        color: #9254de;
        cursor: default;
      `}
  }
`;

export const MetaDescription = styled.div`
  color: #00000073;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
`;

export const MetaPercent = styled.div`
  color: #00000073;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
`;

export const CardActions = styled.div`
  flex-grow: 1;
  justify-content: center;
  &::before {
    display: table;
    content: '';
  }
  &::after {
    display: table;
    clear: both;
    content: '';
  }

  & > span {
    font-size: 16px;
    line-height: 22px;

    &:not(:last-child) {
      margin-right: 5px;
    }

    &:hover {
      color: #1890ff;
    }
  }

  & > button {
    float: right;
  }
`;

export const LoadingAvatar = styled.span`
  box-sizing: border-box;
  background: rgba(190, 190, 190, 0.2);
  margin: 0;
  padding: 0;
  position: relative;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-radius: 5px;
  width: 40px;
  height: 40px;
`;

export const LoadingMetaTitle = styled.div`
  display: inline-block;
  width: 120px;
  height: 26px;
`;

export const LoadingMetaPercent = styled.div`
  width: 100px;
  height: 22px;
`;

export const LoadingAction = styled.div`
  display: inline-block;
  width: 60px;
  height: 24px;
`;
