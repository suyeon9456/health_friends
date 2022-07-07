import React, { Suspense } from 'react';

import { LikedListWrap, LikedListBody } from './style';
import LoadingFallback from './LoadingFallback';
import Likes from './Likes';

const LikedList = () => {
  return (
    <LikedListWrap>
      <LikedListBody>
        <Suspense fallback={<LoadingFallback />}>
          <Likes />
        </Suspense>
      </LikedListBody>
    </LikedListWrap>
  );
};

export default LikedList;
