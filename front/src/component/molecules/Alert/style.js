import styled from 'styled-components';
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, WarningOutlined } from '@ant-design/icons';

export const AlertContainer = styled.div`
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
`;

export const AlertBox = styled.div`
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

export const AlertIconWrapper = styled.div`
  display: block;
  text-align: center;
  width: 100%;
`;

export const AlertErrorIcon = styled(CloseCircleOutlined)`
  font-size: 40px;
  color: #ff4d4f;
`;

export const AlertWarningIcon = styled(WarningOutlined)`
  font-size: 40px;
  color: #faad14;
`;

export const AlertSuccessIcon = styled(CheckCircleOutlined)`
  font-size: 40px;
  color: #1890ff;
`;

export const AlertPrimaryIcon = styled(ExclamationCircleOutlined)`
  font-size: 40px;
  color: #b37feb;
`;

export const AlertContent = styled.div`
  text-align: center;
  margin: 20px 0;
`;
