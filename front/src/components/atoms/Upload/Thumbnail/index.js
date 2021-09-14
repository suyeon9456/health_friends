import React from 'react';
import PropTypes from 'prop-types';

import { ThumbnailContainer,
  ThumbnailWrap,
  ThumbnailImage,
  ThumbnailButtonWrap,
  ThumbnailPreviewButton,
  ThumbnailRemoveButton } from './style';

const Thumbnail = ({ src, onPreivew, onRemove }) => (
  <ThumbnailContainer>
    <ThumbnailButtonWrap className="thumbnail-button">
      <ThumbnailPreviewButton onClick={onPreivew} />
      <ThumbnailRemoveButton onClick={onRemove} />
    </ThumbnailButtonWrap>
    <ThumbnailWrap className="thumbnail-image">
      <ThumbnailImage src={src} />
    </ThumbnailWrap>
  </ThumbnailContainer>
);

Thumbnail.propTypes = {
  src: PropTypes.string,
  onPreivew: PropTypes.func,
  onRemove: PropTypes.func,
};

export default Thumbnail;
