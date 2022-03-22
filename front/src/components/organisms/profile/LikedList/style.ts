import styled, { css } from 'styled-components';

export const LikedListWrap = styled.div`
  position: relative;
  width: calc(100% - 10px);
  min-height: 626px;
  @media (max-width: 767px) {
    margin-left: 0;
  }
  margin-left: 10px;
  margin-top: 10px;
  box-sizing: border-box;
`;

export const LikedListBody = styled.div`
  display: block;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25%, auto));
  gap: 10px;
  @media (max-width: 767px) {
    grid-template-columns: repeat(auto-fill, minmax(50%, auto));
  }
`;

export const Card = styled.div`
  display: inline-block;
  height: 190px;
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
  text-align: center;
`;

export const CardCover = styled.div`
  margin-top: -1px;
  margin-right: -1px;
  margin-left: -1px;
  height: 110px;
  padding: 10px 0;

  & > * {
    margin: 0 auto;
    height: 90px;
    width: 90px;
    border-radius: 50%;
    vertical-align: middle;
    cursor: pointer;
  }

  & > img {
    border-style: none;
    object-fit: cover;
  }

  & > div {
    background-color: #cccccc;
    color: #ffffff;
    text-align: center;
    font-size: 50px;
  }
`;

export const CardBody = styled.div`
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

export const MetaTitle = styled.div`
  overflow: hidden;
  color: #000000d9;
  font-weight: 500;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 8px;
`;

export const MetaActions = styled.div`
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

export const Action = styled.li`
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

  ${({ disabled }: { disabled?: boolean }) =>
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

export const Empty = styled.div`
  text-align: center;
  align-self: center;
  & > .icon {
    font-size: 150px;
    @media (max-width: 767px) {
      font-size: 100px;
    }
  }

  & > * {
    color: #00000012;
  }
`;
