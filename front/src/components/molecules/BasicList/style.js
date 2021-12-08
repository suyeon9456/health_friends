import styled from 'styled-components';

export const BasicListWrap = styled.div`
  position: relative;
  transition: opacity .3s;

  & * {
    outline: none;
  }
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  color: #000000d9;
  border-bottom: 1px solid #f0f0f0;
`;

export const ItemMeta = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  max-width: 100%;
`;
