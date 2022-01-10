import styled from 'styled-components';

export const SimpleCard = styled.div`
  box-sizing: border-box;
  width: 300px;
  margin: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  background: #fff;
  border-radius: 2px;
  padding: 24px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 20px 6px #e8e9e9;

  &::before {
    display: table;
    content: "";
  }
  &::after {
    display: table;
    clear: both;
    content: "";
  }
`;

export const SimpleCardMeta = styled.div`
  overflow: hidden;
`;

export const AvatarWrapper = styled.div`
  float: left;
  padding-right: 16px;
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

export const MetaAddress = styled.div`
  color: #00000073;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
`;

export const MatchingDateWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;

  & > * {
  }
`;

export const MatchingDate = styled.div`
  color: #00000073;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
`;

export const CardClose = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  padding: 0;
  color: #00000073;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  background: 0 0;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: color .3s;
  -webkit-appearance: button;

  & > * {
    display: block;
    width: 56px;
    height: 56px;
    font-size: 16px;
    font-style: normal;
    line-height: 56px;
    text-align: center;
    text-transform: none;
    text-rendering: auto;
  }
`;
