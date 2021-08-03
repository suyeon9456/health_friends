import React from 'react';
import PropTypes from 'prop-types';

import { ThumbnailContainer, ThumbnailWrapper, ThumbnailImage, ThumbnailButtonWrapper, ThumbnailPreviewButton, ThumbnailRemoveButton } from './style';

const Thumbnail = ({ src }) => (
  <ThumbnailContainer>
    <ThumbnailWrapper className="thumbnail-image">
      <ThumbnailImage src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
    </ThumbnailWrapper>
    <ThumbnailButtonWrapper className="thumbnail-button">
      <ThumbnailPreviewButton />
      <ThumbnailRemoveButton />
    </ThumbnailButtonWrapper>
  </ThumbnailContainer>
);

Thumbnail.propTypes = {
  src: PropTypes.string,
};

export default Thumbnail;
