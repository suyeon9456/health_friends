import styled, { css } from 'styled-components';
import { QuestionCircleOutlined } from '@ant-design/icons';

export const ConfirmContainer = styled.div`
  overflow-y: auto;
  align-items: center;
  background: rgba(0,0,0,.4);
  display: flex;
  position: fixed;
  z-index: 1060;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  flex-direction: row;
  justify-content: center;
  padding: .625em;
  overflow-x: hidden;
  transition: background-color .1s;

  ${({ show }) => !show && css`
    display: none;
  `}
`;

export const ConfirmBox = styled.div`
  font-feature-settings: "tnum";
  line-height: 1.5715;
  font-size: 14px;
  color: #000000d9;
  position: relative;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;

  /* background-color: #fff2f0; */
  /* border: 1px solid #ffccc7; */
  background-color: #fff;

  background-clip: padding-box;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;

  padding: 12px 16px;
  color: #000000d9;
  width: 32em;
`;

export const ConfirmIconWrapper = styled.div`
  display: block;
  text-align: center;
  width: 100%;
`;

export const ConfirmPrimaryIcon = styled(QuestionCircleOutlined)`
  font-size: 40px;
  color: #faad14;
`;

export const ConfirmContent = styled.div`
  text-align: center;
  margin: 20px 0;
`;

export const ButtonWrap = styled.div`
  text-align: center;

  & > button {
    margin: 0 5px !important;
  }
`;
