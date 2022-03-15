import styled from 'styled-components';

export const HeaderWrap = styled.div`
  margin: 10px;
  display: flex;
  padding: 0 8px;
  color: #000000d9;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
`;

export const PrevButton = styled.button`
  -webkit-appearance: button;
  min-width: 1.6em;
  font-size: 14px;
  padding: 0;
  color: #00000040;
  line-height: 40px;
  background: 0 0;
  border: 0;
  cursor: pointer;
  transition: color 0.3s;
`;

export const Prev = styled.span`
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 7px;
    height: 7px;
    border: 0 solid currentColor;
    border-width: 1.5px 0 0 1.5px;
    content: '';
  }
`;

export const HeaderView = styled.div`
  flex: auto;
  font-weight: 500;
  line-height: 40px;
`;
