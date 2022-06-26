import React from 'react';
import { CoupleCard, LoadingAvatarWrap, LoadingMatchingIcon } from './style';

const LoadingFallback = () => (
  <>
    {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <CoupleCard key={i}>
        <LoadingMatchingIcon>
          <div>
            <span className="gym-name" />
          </div>
          <div className="gym-address">
            <div />
            <div />
          </div>
        </LoadingMatchingIcon>
        <div className="avatar-wrap">
          <LoadingAvatarWrap>
            <span />
            <div />
          </LoadingAvatarWrap>
          <LoadingAvatarWrap>
            <span />
            <div />
          </LoadingAvatarWrap>
        </div>
      </CoupleCard>
    ))}
  </>
);

export default LoadingFallback;
