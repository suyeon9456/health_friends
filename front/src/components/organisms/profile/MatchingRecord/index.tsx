import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useInfiniteQuery } from 'react-query';
import { AxiosError } from 'axios';
import { BiPlus } from 'react-icons/bi';

import { profileSelector } from '@/../reducers/profile';
import useCheckbox from '@/hooks/useCheckbox';
import { loadSchedulesAPI } from '@/api/schedule';
import {
  ButtonType,
  PeriodFilter,
  StateFilter,
  TypeFilter,
} from '@/../@types/constant';
import { schedulesByIdKey } from '@/../@utils/queryKey';
import { RecordPage } from '@/../@types/schedule';
import { Filter } from '../../../molecules';
import { Button, CheckBox, Icon } from '../../../atoms';
import MatchingCardList from '../../MatchingCardList';
import {
  CancelYnCheckBoxWrap,
  FilterList,
  RecordBody,
  RecordFooter,
  RecordWrap,
} from './style';

const MatchingRecord = ({ isProfile }: { isProfile?: boolean }) => {
  const { profile } = useSelector(profileSelector);
  const [isCanceled, setIsCanceled] = useState<boolean>(false);
  const [status, onChangeStatus] = useCheckbox<string>([]);
  const [term, onChangeTerm] = useCheckbox<string>([]);
  const [type, onChangeType] = useCheckbox<string>([]);

  const { isFetching, hasNextPage, fetchNextPage, data } = useInfiniteQuery<
    RecordPage | undefined,
    AxiosError
  >(
    schedulesByIdKey({
      profileId: profile?.id,
      status,
      term,
      type,
      isCanceled,
    }),
    ({ pageParam = 0 }: any) => {
      return loadSchedulesAPI({
        isProfile,
        profileId: profile?.id,
        limit: pageParam,
        status,
        term,
        type,
        isCanceled,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!profile,
      staleTime: 2 * 60 * 1000,
      getNextPageParam: (lastPage: RecordPage | undefined) => {
        if (!lastPage) return;
        return lastPage[lastPage.length - 1].nextCursor > 0
          ? lastPage[lastPage.length - 1].nextCursor
          : undefined;
      },
      useErrorBoundary: true,
    }
  );

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
      <RecordBody schedules={data?.pages.length ?? 0}>
        <MatchingCardList
          isLoading={isFetching}
          pages={data?.pages}
          pageParams={data?.pageParams}
        />
      </RecordBody>
      <RecordFooter>
        <Button
          type={ButtonType.PRIMARY}
          disabled={!hasNextPage}
          icon={<Icon icon={<BiPlus />} />}
          onClick={() => fetchNextPage()}
        >
          더보기
        </Button>
      </RecordFooter>
    </RecordWrap>
  );
};

export default MatchingRecord;
