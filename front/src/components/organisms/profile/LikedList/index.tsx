import React from 'react';
import { useQueryErrorResetBoundary } from 'react-query';

import { LikedListWrap } from './style';
import Likes from './Likes';
import SuspenseWithErrorBoundary from '../../SuspenseWithErrorBoundary';

const LikedList = () => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <LikedListWrap>
      <SuspenseWithErrorBoundary
        onReset={reset}
        errorMessgae="관심친구를 로드하는데 실패 하였습니다."
      >
        <Likes />
      </SuspenseWithErrorBoundary>
    </LikedListWrap>
  );
};

export default LikedList;
