import React, { useCallback, useState } from 'react';
import { AxiosError } from 'axios';
import { useInfiniteQuery } from 'react-query';
import { BiPlus } from 'react-icons/bi';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import useCheckbox from '@/hooks/useCheckbox';
import {
  ButtonType,
  PeriodFilter,
  StateFilter,
  TypeFilter,
} from '@/../@types/utils';
import { useSelector } from 'react-redux';
import { profileSelector } from '@/../reducers/profile';
import { schedulesByIdKey } from '@/../@utils/queryKey';
import { loadSchedulesAPI } from '@/api/schedule';
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
  const [status, onChangeStatus] = useCheckbox<string>([]);
  const [term, onChangeTerm] = useCheckbox<string>([]);
  const [type, onChangeType] = useCheckbox<string>([]);
  const [rejectedMatching, setRejectedMatching] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<any>([]);

  const { isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery<
    any[],
    AxiosError
  >(
    schedulesByIdKey({
      profileId: profile.id,
      status,
      term,
      type,
      rejectedMatching,
    }),
    ({ pageParam = 0 }) =>
      loadSchedulesAPI({
        isProfile,
        profileId: profile.id,
        limit: pageParam,
        status,
        term,
        type,
        rejectedMatching,
      }),
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!profile.id,
      getNextPageParam: (lastPage) => {
        return lastPage[lastPage.length - 1].nextCursor > 0
          ? lastPage[lastPage.length - 1].nextCursor
          : undefined;
      },
      onSuccess: ({ pages }) => {
        if (isEmpty(pages[0])) {
          return;
        }
        if (schedules?.length === 0) {
          setSchedules(pages[0]);
          return;
        }
        if (pages.length === 1) {
          setSchedules(pages[0]);
          return;
        }
        if (!isEqual(schedules, pages[pages.length - 1])) {
          setSchedules([...schedules, ...pages[pages.length - 1]]);
        }
      },
    }
  );

  const onChangeRejectedMatching = useCallback(
    (e) => {
      setSchedules([]);
      setRejectedMatching(e.currentTarget.checked);
    },
    [rejectedMatching]
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
          checked={rejectedMatching}
          onChange={onChangeRejectedMatching}
        />
      </CancelYnCheckBoxWrap>
      <RecordBody schedules={schedules?.length}>
        <MatchingCardList schedules={schedules} isLoading={isFetching} />
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
