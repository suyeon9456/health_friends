import { CheckSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const ThumbnailContainer = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;

  &:hover {
    & > .thumbnail-image:hover::before {
      opacity: 1;
    }
    & > .thumbnail-button {
      opacity: 1;
    }
  }

  .thumbnail-button:hover + .thumbnail-image::before {
    opacity: 1;
  }
`;

export const ThumbnailWrap = styled.span`
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

export const ThumbnailImage = styled.img`
  position: static;
  display: block;
  width: 100%;
  height: 100%;
  -o-object-fit: contain;
  object-fit: contain;
  line-height: 54px;
  text-align: center;
  opacity: 0.8;
`;

export const ThumbnailButtonWrap = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.3s;
`;

export const ThumbnailUploadCheckButton = styled(CheckSquareOutlined)`
  transition: color 0.3s ease;
  color: #fff;
  font-size: 16px;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  margin: 5px;
`;

export const ThumbnailRemoveButton = styled(DeleteOutlined)`
  height: 20px;
  color: #fff;
  line-height: 1;
  padding: 0;
  font-size: 16px;
  border-radius: 2px;
  cursor: pointer;
  margin: 5px;
`;
