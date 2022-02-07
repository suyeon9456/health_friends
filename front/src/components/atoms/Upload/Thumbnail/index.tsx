import React from 'react';

import { ThumbnailContainer,
  ThumbnailWrap,
  ThumbnailImage,
  ThumbnailButtonWrap,
  ThumbnailUploadCheckButton,
  ThumbnailRemoveButton } from './style';

const Thumbnail = ({ src, onAddImage, onRemove }: {
  src?: string,
  onAddImage?: () => void,
  onRemove?: () => void,
}) => (
  <ThumbnailContainer>
    <ThumbnailButtonWrap className="thumbnail-button">
      <ThumbnailUploadCheckButton onClick={onAddImage} />
      <ThumbnailRemoveButton onClick={onRemove} />
    </ThumbnailButtonWrap>
    <ThumbnailWrap className="thumbnail-image">
      <ThumbnailImage src={src} />
    </ThumbnailWrap>
  </ThumbnailContainer>
);

export default Thumbnail;
