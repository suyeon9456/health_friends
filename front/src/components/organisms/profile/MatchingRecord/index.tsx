import React, { useCallback, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { BiPlus } from 'react-icons/bi';
import isEmpty from 'lodash/isEmpty';

import { RecordScheduleFetch } from '@/../@types/schedule';
import useCheckbox from '@/hooks/useCheckbox';
import { ButtonType } from '@/../@types/utils';
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

const MatchingRecord = () => {
  const [status, onChangeStatus] = useCheckbox<string>([]);
  const [term, onChangeTerm] = useCheckbox<string>([]);
  const [type, onChangeType] = useCheckbox<string>([]);
  const [limit, setLimit] = useState<number>(3);
  const [rejectedMatching, setRejectedMatching] = useState<boolean>(false);

  const {
    isLoading,
    error,
    data: { count, schedules },
    isFetching,
  } = useQuery<any | undefined, AxiosError>(
    ['record', status, term, type, limit, rejectedMatching],
    async () => {
      const statusquery =
        !isEmpty(status) && `&${status.map((m) => `${m}=true`).join('&')}`;
      const termquery =
        !isEmpty(term) && `&${term.map((m) => `${m}=true`).join('&')}`;
      const typequery =
        !isEmpty(type) && `&${type.map((m) => `${m}=true`).join('&')}`;
      const {
        data,
      }: AxiosResponse<{
        count: number;
        schedules: RecordScheduleFetch[];
      }> = await axios.get(
        `/schedules?limit=${limit}&rejectedMatching=${rejectedMatching}${termquery}${typequery}${statusquery}`
      );
      return {
        ...data,
        schedules: data.schedules.map((schedule) => ({
          ...schedule,
          start: new Date(schedule?.startDate),
          end: new Date(schedule?.endDate),
        })),
      };
    },
    { initialData: { count: 0, schedules: [] } }
  );

  const onMoreSchedule = useCallback(() => {
    setLimit((prev) => prev + 3);
  }, [limit]);

  const onChangeRejectedMatching = useCallback(
    (e) => {
      if (e.currentTarget.checked) {
        setRejectedMatching(true);
      } else {
        // 체크 해제
        setRejectedMatching(false);
      }
    },
    [rejectedMatching]
  );

  return (
    <RecordWrap>
      <FilterList>
        <Filter
          key="state"
          label="매칭상태"
          items={[
            { value: 'before', text: '매칭수락 후' },
            { value: 'after', text: '매칭수락 전' },
          ]}
          onChange={onChangeStatus}
          checkList={status}
        />
        <Filter
          key="period"
          label="매칭기간"
          items={[
            { value: 'scheduledRecord', text: '예정된매칭' },
            { value: 'lastRecord', text: '지난매칭' },
          ]}
          onChange={onChangeTerm}
          checkList={term}
        />
        <Filter
          key="type"
          label="매칭유형"
          items={[
            { value: 'requestRecord', text: '보낸매칭' },
            { value: 'receiveRecord', text: '받은매칭' },
          ]}
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
      <RecordBody schedules={schedules.length}>
        <MatchingCardList schedules={schedules} />
      </RecordBody>
      <RecordFooter>
        <Button
          type={ButtonType.PRIMARY}
          disabled={count || schedules.length >= 0}
          icon={<Icon icon={<BiPlus />} />}
          onClick={onMoreSchedule}
        >
          더보기
        </Button>
      </RecordFooter>
    </RecordWrap>
  );
};

export default MatchingRecord;
