import styled from 'styled-components';

export const ToolbarWrap = styled.div`
  display: block;
`;

export const RbcBtnGroup = styled.span`
  display: block;
  padding: 0 10px;
`;

export const ButtonGroup = styled.span`
  float: right;
  & > button {
    padding: 0 !important;
    border: none !important;
    font-size: 26px !important;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.54);
    &:hover,
    &:focus {
      color: #9254de;
      background-color: #ffffff;
    }
    &:active {
      color: #9254de;
      background-color: #ffffff;
      box-shadow: none;
    }
  }

  & > .now {
    margin: 0 5px !important;
    font-size: 20px !important;
  }
`;
