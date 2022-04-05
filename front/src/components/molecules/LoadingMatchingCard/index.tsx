import React from 'react';

import {
  LoadingCardCover,
  LoadingCardMeta,
  LoadingCard,
  LoadingAvatar,
  LoadingCardBody,
  LoadingMetaDate,
  LoadingMetaTitle,
  LoadingMetaDescription,
} from './style';

const LoadingMatchingCard = () => (
  <LoadingCard>
    <LoadingCardCover>
      <LoadingAvatar />
    </LoadingCardCover>
    <LoadingCardBody>
      <LoadingCardMeta>
        <LoadingMetaDate className="lazyData" />
        <LoadingMetaDate className="lazyData" />
        <LoadingMetaTitle className="lazyData" />
        <LoadingMetaDescription className="lazyData" />
        <LoadingMetaDescription className="lazyData" />
      </LoadingCardMeta>
    </LoadingCardBody>
  </LoadingCard>
);

export default LoadingMatchingCard;
