import React from 'react';
import {
  CardContentWrap,
  FriendsCardWrap,
  FriendsLoadingCard,
  LoadingAvatar,
  LoadingAvatarWrap,
  LoadingDescription,
  LoadingFallbackWrap,
  LoadingTitle,
} from './style';

const LoadingFallback = () => (
  <LoadingFallbackWrap>
    {Array.from({ length: 4 }, (_, i) => i).map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <FriendsCardWrap key={i}>
        <FriendsLoadingCard>
          <LoadingAvatarWrap>
            <LoadingAvatar className="lazyData" />
          </LoadingAvatarWrap>
          <CardContentWrap>
            <LoadingTitle className="lazyData" />
            <LoadingDescription className="lazyData" />
            <LoadingDescription className="lazyData" />
          </CardContentWrap>
        </FriendsLoadingCard>
      </FriendsCardWrap>
    ))}
  </LoadingFallbackWrap>
);

export default LoadingFallback;
