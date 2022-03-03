import styled from 'styled-components';

export const ItemCard = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  outline: none;
`;

export const ItemWrap = styled.li`
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  padding: 12px 10PX;
  color: #000000d9;
  outline: none;
`;

export const ItemContent = styled.div`
  color: #000000d9;
  outline: none;
`;

export const ItemTitle = styled.h4`
  margin-bottom: 4px;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  outline: none;

  & > a {
    color: #000000d9;
    transition: all .3s;
    cursor: pointer;
  }
`;

export const ItemDescription = styled.div`
  color: #00000073;
  font-size: 14px;
  line-height: 1.5715;
  outline: none;
`;
