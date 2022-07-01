import React, { useCallback, useState } from 'react';

import useCheckbox from '@/hooks/useCheckbox';
import { PeriodFilter, StateFilter, TypeFilter } from '@/../@types/constant';
import { QueryErrorResetBoundary } from 'react-query';
import { Filter } from '../../../molecules';
import { CheckBox } from '../../../atoms';
import MatchingCardList from '../../MatchingCardList';
import { CancelYnCheckBoxWrap, FilterList, RecordWrap } from './style';
import ErrorBoundary from '../../ErrorBoundary';
import ErrorFallback from '../../ErrorFallback';

const MatchingRecord = () => {
  const [isCanceled, setIsCanceled] = useState<boolean>(false);
  const [status, onChangeStatus] = useCheckbox<string>([]);
  const [term, onChangeTerm] = useCheckbox<string>([]);
  const [type, onChangeType] = useCheckbox<string>([]);

  const onChangeRejectedMatching = useCallback(
    (e) => setIsCanceled(e.currentTarget.checked),
    [isCanceled]
  );

  return (
    <RecordWrap>
      <FilterList>
        <Filter
          key="state"
          label="매칭상태"
          items={StateFilter}
          onChange={onChangeStatus}
          checkList={status}
        />
        <Filter
          key="period"
          label="매칭기간"
          items={PeriodFilter}
          onChange={onChangeTerm}
          checkList={term}
        />
        <Filter
          key="type"
          label="매칭유형"
          items={TypeFilter}
          onChange={onChangeType}
          checkList={type}
        />
      </FilterList>
      <CancelYnCheckBoxWrap>
        <CheckBox
          label="취소된 매칭으로 보기"
          value="cancel"
          checked={isCanceled}
          onChange={onChangeRejectedMatching}
        />
      </CancelYnCheckBoxWrap>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallback={ErrorFallback}
            message="매칭기록을 불러오는데 실패하였습니다."
          >
            <MatchingCardList
              status={status}
              term={term}
              type={type}
              isCanceled={isCanceled}
            />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </RecordWrap>
  );
};

export default MatchingRecord;
