import { ShowModalType } from '@/../@types/constant';
import styled, { css } from 'styled-components';

export const Card = styled.div`
  display: inline-block;
  width: 300px;
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
  border-radius: 8px;
  overflow: hidden;

  &:hover {
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    border-color: transparent;
    & .box {
      display: block;
    }

    & img {
      transform: scale(1.2);
    }
  }
`;

export const CardCover = styled.div`
  position: relative;
  /* border-radius: 8px; */
  margin-top: -1px;
  margin-right: -1px;
  margin-left: -1px;
  height: 180px;
  overflow: hidden;

  & > * {
    display: block;
    width: 100%;
  }

  & > img {
    height: 100%;
    border-radius: 8px 8px 0 0;
    border-style: none;
    object-fit: cover;
  }

  & > div {
    height: 100%;
    border-radius: 8px 8px 0 0;
    background-color: #cccccc;
    color: #ffffff;
    vertical-align: middle;
    text-align: center;
    font-size: 90px;
  }

  & .box {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: #cccccc7a;
  }
`;

export const CardBody = styled.div`
  height: 135px;
  padding: 24px;
  cursor: pointer;
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

export const MetaDate = styled.div`
  color: #00000073;
  font-size: 12px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
`;

export const MetaTitle = styled.div`
  overflow: hidden;
  color: #000000d9;
  font-weight: 500;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 8px;
`;

export const MetaDescription = styled.div`
  color: #00000073;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  text-align: left;
`;

export const CardActions = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  border-radius: 0 0 8px 8px;
  &::before {
    display: table;
    content: '';
  }
  &::after {
    display: table;
    clear: both;
    content: '';
  }
  & > li:not(:last-child) {
    border-right: 1px solid #f0f0f0;
  }
`;

export const Action = styled.li<{
  disabled?: boolean;
  onClick: () => void;
}>`
  float: left;
  margin: 12px 0;
  color: #00000073;
  text-align: center;
  flex-grow: 1;
  cursor: pointer;

  & > * {
    font-size: 16px;
    line-height: 22px;

    &:hover {
      color: #9254de;
    }
  }

  &:hover {
    & > * {
      color: #9254de;
    }
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: #00000040;
      cursor: default;
      &:hover {
        & > * {
          color: #00000040;
        }
      }
    `}
`;
