import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';

import { RootState } from '@/../store/configureStore';
import { Filter } from '../../../molecules';
import { Button, CheckBox } from '../../../atoms';
import MatchingCardList from '../../MatchingCardList';
import { CancelYnCheckBoxWrap, FilterList, RecordBody, RecordFooter, RecordWrap } from './style';
import { loadSchedulesRequest } from '@/../reducers/schedule';

const MatchingRecord = () => {
  const dispatch = useDispatch();

  const { schedules, schedulesCount } = useSelector((state: RootState) => state.schedule);
  const [status, setStatus] = useState<string[]>([]);
  const [term, setTerm] = useState<string[]>([]);
  const [type, setType] = useState<string[]>([]);
  const [schedulesLimit, setSchedulesLimit] = useState<number>(3);
  const [rejectedMatching, setRejectedMatching] = useState<boolean>(false);

  const onMoreSchedule = useCallback(() => {
    setSchedulesLimit((prev) => prev + 3);
  }, [schedulesLimit]);

  const onChangeStatus = useCallback((checked, value) => {
    if (checked) {
      setStatus([...status, value]);
    } else {
      // 체크 해제
      setStatus(status.filter((el) => el !== value));
    }
  }, [status]);

  const onChangeTerm = useCallback((checked, value) => {
    if (checked) {
      setTerm([...term, value]);
    } else {
      // 체크 해제
      setTerm(term.filter((el) => el !== value));
    }
  }, [term]);

  const onChangeType = useCallback((checked, value) => {
    if (checked) {
      setType([...type, value]);
    } else {
      // 체크 해제
      setType(type.filter((el) => el !== value));
    }
  }, [type]);

  const onChangeRejectedMatching = useCallback((e) => {
    if (e.currentTarget.checked) {
      setRejectedMatching(true);
    } else {
      // 체크 해제
      setRejectedMatching(false);
    }
  }, [rejectedMatching]);

  useEffect(() => {
    dispatch(loadSchedulesRequest({ profileMenu: 'record',
      limit: schedulesLimit, term, type, status, rejectedMatching }));
  }, [term, type, status, rejectedMatching, schedulesLimit]);
  return (
    <RecordWrap>
      <FilterList>
        <Filter
          key="state"
          label="매칭상태"
          items={[
            { value: 'before', text: '매칭수락 후' },
            { value: 'after', text: '매칭수락 전' }]}
          onChange={onChangeStatus}
          checkList={status}
        />
        <Filter
          key="period"
          label="매칭기간"
          items={[
            { value: 'scheduledRecord', text: '예정된매칭' },
            { value: 'lastRecord', text: '지난매칭' }]}
          onChange={onChangeTerm}
          checkList={term}
        />
        <Filter
          key="type"
          label="매칭유형"
          items={[
            { value: 'requestRecord', text: '보낸매칭' },
            { value: 'receiveRecord', text: '받은매칭' }]}
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
          type="primary"
          disabled={schedulesCount <= schedules.length}
          icon={<PlusOutlined />}
          onClick={onMoreSchedule}
        >
          더보기
        </Button>
      </RecordFooter>
    </RecordWrap>
  );
};

export default MatchingRecord;
