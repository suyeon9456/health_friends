import React, { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { BiPlus } from 'react-icons/bi';
import isEmpty from 'lodash/isEmpty';

import useCheckbox from '@/hooks/useCheckbox';
import { ButtonType } from '@/../@types/utils';
import { useSelector } from 'react-redux';
import { profileSelector } from '@/../reducers/profile';
import { loadSchedulesAPI } from '@/api/user';
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
  const [limit, setLimit] = useState<number>(3);
  const [rejectedMatching, setRejectedMatching] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<any>([]);

  const {
    isFetching,
    data: { isLast, apiSchedules },
  } = useQuery<any | undefined, AxiosError>(
    ['record', status, term, type, limit, rejectedMatching],
    () => {
      const userId = isProfile ? `userId=${profile?.id}&` : '';
      const statusquery =
        !isEmpty(status) && `&${status.map((m) => `${m}=true`).join('&')}`;
      const termquery =
        !isEmpty(term) && `&${term.map((m) => `${m}=true`).join('&')}`;
      const typequery =
        !isEmpty(type) && `&${type.map((m) => `${m}=true`).join('&')}`;
      return loadSchedulesAPI({
        userId,
        limit,
        rejectedMatching,
        statusquery,
        termquery,
        typequery,
      });
    },
    {
      initialData: { isLast: false, schedules: [] },
      retry: false,
      refetchOnWindowFocus: false,
    }
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

  useEffect(() => {
    if (!isEmpty(apiSchedules)) {
      if (schedules?.length === 0) {
        return setSchedules(apiSchedules);
      }
      setSchedules([...schedules, ...apiSchedules]);
    }
  }, [apiSchedules]);
  useEffect(() => {
    console.log('isFetching', isFetching);
  }, [isFetching]);
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
      <RecordBody schedules={schedules?.length}>
        <MatchingCardList schedules={schedules} isLoading={isFetching} />
      </RecordBody>
      <RecordFooter>
        <Button
          type={ButtonType.PRIMARY}
          disabled={isLast}
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
