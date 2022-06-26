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
  <>
    {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <LoadingCard key={i}>
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
    ))}
  </>
);

export default LoadingMatchingCard;
