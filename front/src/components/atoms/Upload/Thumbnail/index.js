import React from 'react';
import PropTypes from 'prop-types';

import { ThumbnailContainer,
  ThumbnailWrap,
  ThumbnailImage,
  ThumbnailButtonWrap,
  ThumbnailUploadCheckButton,
  ThumbnailRemoveButton } from './style';

const Thumbnail = ({ src, onAddImage, onRemove }) => (
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

Thumbnail.propTypes = {
  src: PropTypes.string,
  onAddImage: PropTypes.func,
  onRemove: PropTypes.func,
};

export default Thumbnail;
