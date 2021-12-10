import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';

import { LOAD_SCHEDULES_REQUEST } from '../../../../../reducers/schedule';
import { Button, CheckBox } from '../../../atoms';
import { Filter } from '../../../molecules';
import { CancelYnCheckBoxWrap, FilterList, RecordBody, RecordFooter, RecordWrap } from './style';
import MatchingCardList from '../../MatchingCardList';

const MatchingRecord = () => {
  const { schedules } = useSelector((state) => state.schedule);
  const dispatch = useDispatch();
  const [schedulesLimit, setSchedulesLimit] = useState(3);

  const [status, setStatus] = useState([]);
  const [term, setTerm] = useState([]);
  const [type, setType] = useState([]);
  const [rejectedMatching, setRejectedMatching] = useState(false);

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
    dispatch({
      type: LOAD_SCHEDULES_REQUEST,
      data: { profileMenu: 'record', limit: schedulesLimit, term, type, status, rejectedMatching },
    });
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
          value={rejectedMatching}
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
