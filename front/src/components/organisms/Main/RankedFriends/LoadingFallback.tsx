import React from 'react';
import { LoadingRankItem, LoadingRankWrap } from './style';

const LoadingFallback = () => (
  <>
    {Array.from({ length: 5 }, (_, i) => i).map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <LoadingRankWrap key={`${i}rank`}>
        <LoadingRankItem>
          <span />
          <div />
        </LoadingRankItem>
      </LoadingRankWrap>
    ))}
  </>
);

export default LoadingFallback;
