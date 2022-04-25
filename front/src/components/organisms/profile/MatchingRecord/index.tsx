import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useInfiniteQuery } from 'react-query';
import { AxiosError } from 'axios';
import isEmpty from 'lodash/isEmpty';
import { BiPlus } from 'react-icons/bi';

import { profileSelector } from '@/../reducers/profile';
import useCheckbox from '@/hooks/useCheckbox';
import { loadSchedulesAPI } from '@/api/schedule';
import {
  ButtonType,
  PeriodFilter,
  StateFilter,
  TypeFilter,
} from '@/../@types/utils';
import { schedulesByIdKey } from '@/../@utils/queryKey';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const { ft } = router.query;
  const { profile } = useSelector(profileSelector);
  const [isCanceled, setIsCanceled] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<any>([]);
  const [status, onChangeStatus] = useCheckbox<string>([]);
  const [term, onChangeTerm] = useCheckbox<string>([]);
  const [type, onChangeType] = useCheckbox<string>([]);

  const { isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery<
    any[],
    AxiosError
  >(
    schedulesByIdKey({
      profileId: profile.id,
      status,
      term,
      type,
      isCanceled,
    }),
    ({ pageParam = 0 }) => {
      // const filter: { fs?: string; fp?: string; ft?: string } = {};
      // if (!isEmpty(status)) filter.fs = status.join(',');
      // if (!isEmpty(term)) filter.fp = term.join(',');
      // if (!isEmpty(type)) filter.ft = type.join(',');
      // void router.push(
      //   { query: { id: profile.id, tab: Menu.RECORD, ...filter } },
      //   undefined,
      //   {
      //     shallow: true,
      //   }
      // );
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
      retry: false,
      enabled: !!profile.id,
      getNextPageParam: (lastPage) => {
        return lastPage[lastPage.length - 1].nextCursor > 0
          ? lastPage[lastPage.length - 1].nextCursor
          : undefined;
      },
      onSuccess: ({ pages }) => {
        if (isEmpty(pages)) {
          setSchedules([]);
          return;
        }
        if (pages.length > 1) {
          setSchedules((prev: any) => [...prev, ...pages[pages.length - 1]]);
          return;
        }
        setSchedules(pages[pages.length - 1]);
      },
    }
  );

  const onChangeRejectedMatching = useCallback(
    (e) => {
      setSchedules([]);
      setIsCanceled(e.currentTarget.checked);
    },
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
