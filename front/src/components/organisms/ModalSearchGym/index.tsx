import React, { useCallback, useEffect, useState } from 'react';
import useInput from '@/hooks/useInput';
import { ModalSearchGymProps } from '@/../@types/gym';
import { useQueryErrorResetBoundary } from 'react-query';
import { Search } from '../../atoms';
import { BoxContent, GymListWrap } from './style';
import GymList from './GymList';
import ErrorBoundary from '../ErrorBoundary';
import ErrorFallback from '../ErrorFallback';

const ModalSearchGym = ({ onSelectedGym, setGym }: ModalSearchGymProps) => {
  const { reset } = useQueryErrorResetBoundary();
  const [searchWord, setSearchWord] = useState<string>('');
  useEffect(() => console.log(searchWord), [searchWord]);
  return (
    <BoxContent>
      <Search setSearchWord={setSearchWord} />
      <GymListWrap>
        <ErrorBoundary
          onReset={reset}
          fallback={ErrorFallback}
          message="해당 검색어에 대한 헬스장을 로드하는데 실패 하였습니다."
        >
          <GymList
            searchQuery={searchWord}
            setGym={setGym}
            onSelectedGym={onSelectedGym}
          />
        </ErrorBoundary>
      </GymListWrap>
    </BoxContent>
  );
};

export default ModalSearchGym;
