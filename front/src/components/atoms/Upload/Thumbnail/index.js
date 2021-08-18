import React from 'react';
import PropTypes from 'prop-types';

import { ThumbnailContainer, ThumbnailWrapper, ThumbnailImage, ThumbnailButtonWrapper, ThumbnailPreviewButton, ThumbnailRemoveButton } from './style';

const Thumbnail = ({ src, onPreivew, onRemove }) => (
  <ThumbnailContainer>
    <ThumbnailButtonWrapper className="thumbnail-button">
      <ThumbnailPreviewButton onClick={onPreivew} />
      <ThumbnailRemoveButton onClick={onRemove} />
    </ThumbnailButtonWrapper>
    <ThumbnailWrapper className="thumbnail-image">
      <ThumbnailImage src={src} />
    </ThumbnailWrapper>
  </ThumbnailContainer>
);

Thumbnail.propTypes = {
  src: PropTypes.string,
  onPreivew: PropTypes.func,
  onRemove: PropTypes.func,
};

export default Thumbnail;
