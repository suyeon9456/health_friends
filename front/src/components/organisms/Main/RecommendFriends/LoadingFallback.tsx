import React from 'react';
import {
  CardContentWrap,
  FriendsLoadingCard,
  LoadingAvatar,
  LoadingAvatarWrap,
  LoadingDescription,
  LoadingTitle,
} from './style';

const LoadingFallback = () => (
  <>
    {Array.from({ length: 4 }, (_, i) => i).map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <FriendsLoadingCard key={i}>
        <LoadingAvatarWrap>
          <LoadingAvatar className="lazyData" />
        </LoadingAvatarWrap>
        <CardContentWrap>
          <LoadingTitle className="lazyData" />
          <LoadingDescription className="lazyData" />
          <LoadingDescription className="lazyData" />
        </CardContentWrap>
      </FriendsLoadingCard>
    ))}
  </>
);

export default LoadingFallback;
