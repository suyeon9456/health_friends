import styled from 'styled-components';
import { DeleteOutlined, FrownOutlined } from '@ant-design/icons';

export const ErrorContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;

  &:hover {
    & > .error:hover::before {
      opacity: 1;
    }
    & > .error-button {
      opacity: 1;
    }
  }

  .error-button:hover + .error::before {
    opacity: 1;
  }
`;

export const ErrorWrap = styled.span`
  display: block;
  width: 100%;
  height: 100%;

  &::before {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: all 0.3s;
    content: ' ';
    border-radius: 2px;
    box-sizing: border-box;
  }
`;

export const ErrorContent = styled.div`
  position: static;
  display: block;
  width: 100%;
  height: 100%;
  -o-object-fit: contain;
  object-fit: contain;
  line-height: 84px;
  text-align: center;
  opacity: .8;
`;

export const ErrorContentIcon = styled(FrownOutlined)`
  font-size: 30px;
  color: #ff4d4f;
`;

export const ErrorContentText = styled.span`
  position: absolute;
  width: 100%;
  bottom: 10px;
  display: block;
  padding: 0;
  line-height: 3.5715;
  text-align: center;
  color: #ff4d4f;
`;

export const ErrorButtonWrap = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  white-space: nowrap;
  transform: translate(-50%,-50%);
  opacity: 0;
  transition: all .3s;
`;

export const ErrorRemoveButton = styled(DeleteOutlined)`
  height: 20px;
  color: #fff;
  line-height: 1;
  padding: 0;
  font-size: 16px;
  border-radius: 2px;
  cursor: pointer;
  margin: 5px;
`;
