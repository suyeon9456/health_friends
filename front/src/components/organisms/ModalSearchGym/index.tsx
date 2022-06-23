import React, { useCallback, useState } from 'react';
import useInput from '@/hooks/useInput';
import { ModalSearchGymProps } from '@/../@types/gym';
import { useQueryErrorResetBoundary } from 'react-query';
import { Search } from '../../atoms';
import { BoxContent, GymListWrap } from './style';
import GymList from './GymList';
import ErrorBoundary from '../ErrorBoundary';
import Fallback from '../Main/RecommendFriends/Fallback';

const ModalSearchGym = ({ setShowModal, setGym }: ModalSearchGymProps) => {
  const { reset } = useQueryErrorResetBoundary();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchWord, onChangeSearchWord] = useInput<string>('');

  const onSearch = useCallback(() => {
    setSearchQuery(searchWord);
  }, [searchWord]);

  return (
    <BoxContent>
      <Search
        value={searchWord}
        onChange={onChangeSearchWord}
        onSearch={onSearch}
        enterButton
      />
      <GymListWrap>
        <ErrorBoundary
          onReset={reset}
          fallback={Fallback}
          message="해당 검색어에 대한 헬스장을 로드하는데 실패 하였습니다."
        >
          <GymList
            searchQuery={searchQuery}
            setGym={setGym}
            setShowModal={setShowModal}
          />
        </ErrorBoundary>
      </GymListWrap>
    </BoxContent>
  );
};

export default ModalSearchGym;
