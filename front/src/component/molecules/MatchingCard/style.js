import styled from 'styled-components';

export const Card = styled.div`
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
  font-feature-settings: "tnum";
  position: relative;
  background: #fff;
  border-radius: 2px;
`;

export const CardCover = styled.div`
  margin-top: -1px;
  margin-right: -1px;
  margin-left: -1px;
  height: 180px;

  & > * {
    display: block;
    width: 100%;
  }

  & > img {
    height: 100%;
    border-radius: 2px 2px 0 0;
    vertical-align: middle;
    border-style: none;
    object-fit:contain;
  }
`;

export const CardBody = styled.div`
  padding: 24px;
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

export const CardMeta = styled.div`
  margin: -4px 0;
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

export const MetaDate = styled.div`
  color: #00000073;
  font-size: 12px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
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
  font-feature-settings: "tnum";
`;

export const CardActions = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  background: #fff;
  border-top: 1px solid #f0f0f0;
    &::before {
      display: table;
      content: "";
    }
    &::after {
      display: table;
      clear: both;
      content: "";
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
      color: #1890ff;
    }
  }
`;
