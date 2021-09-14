import { UploadOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';

export const UploadContainer = styled.div`
  width: 104px;
  height: 104px;
  margin-right: 8px;
  margin-bottom: 8px;
  text-align: center;
  vertical-align: top;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  transition: border-color .3s;

  &:hover {
    border-color: #1890ff;
  }

  ${({ error }) => error && css`
    border: 1px solid #ff4d4f;

    &:hover {
      border-color: #ff4d4f;
    }
  `}
`;

export const UploadWrap = styled.span`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  outline: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

export const UploadInput = styled.input`
  display: none;
  cursor: pointer;
`;

export const UploadIcon = styled(UploadOutlined)`
  font-size: 20px;
  color: #969faf;
  width: 100%;
  float: left;
`;

export const UploadText = styled.span`
  font-size: 12px;
  color: #969faf;
`;
