import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { EditOutlined, PlusOutlined, RetweetOutlined } from '@ant-design/icons';

import { LOAD_SCHEDULES_REQUEST } from '../../../../../reducers/schedule';
import { Button, CheckBox } from '../../../atoms';
import { Tabs, MatchingCard, Filter } from '../../../molecules';
import { CancelYnCheckBoxWrap, FilterList, RecordBody, RecordFooter, RecordWrap, TabList, MatchingCardListWrap } from './style';
import ModalMatchingDetail from '../ModalMatchingDetail';

const MatchingRecord = () => {
  const { me } = useSelector((state) => state.user);
  const { schedules } = useSelector((state) => state.schedule);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState('scheduledRecord');
  const [schedulesLimit, setSchedulesLimit] = useState(3);
  const [showModal, setShowModal] = useState(false);
  // const [showFilter, setShowFilter] = useState('');
  const [modalType, setModalType] = useState('view');

  const [term, setTerm] = useState([]);
  const [type, setType] = useState([]);
  const [rejectedMatching, setRejectedMatching] = useState(false);

  const onChangeSelectedTab = useCallback((tab) => () => {
    setSelectedTab(tab);
  }, [selectedTab]);

  const onMoreSchedule = useCallback(() => {
    setSchedulesLimit((prev) => prev + 3);
  }, [schedulesLimit]);

  const onChangeShowModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, [showModal]);

  const onChangeTerm = useCallback((checked, value) => {
    console.log('checked', checked);
    if (checked) {
      setTerm([...term, value]);
    } else {
      // 체크 해제
      setTerm(term.filter((el) => el !== value));
    }
  }, [term]);

  const onChangeType = useCallback((checked, value) => {
    console.log('checked', checked);
    if (checked) {
      setType([...type, value]);
    } else {
      // 체크 해제
      setType(type.filter((el) => el !== value));
    }
  }, [type]);

  const onChangeRejectedMatching = useCallback((e, value) => {
    console.log('checked', e);
    if (e.currentTarget.checked) {
      setRejectedMatching(true);
    } else {
      // 체크 해제
      setRejectedMatching(false);
    }
  }, [rejectedMatching]);

  const [isPayModalClicked, setIsPayModalClicked] = useState(false);

  const handlePayModalOff = (e) => {

    const clicked = e.target.closest('.paymodal');

    if (clicked) return;
    
    else {
      setIsPayModalClicked(false);
    }
  };

  useEffect(() => {
    console.log('term', term);
    // const []
    dispatch({
      type: LOAD_SCHEDULES_REQUEST,
      data: { limit: schedulesLimit, term, type, rejectedMatching },
    });
  }, [term, type, rejectedMatching, schedulesLimit]);
  return (
    <RecordWrap>
      {/* <TabList>
        <Tabs
          tabs={[
            { value: 'scheduledRecord', text: '예정된매칭' },
            { value: 'lastRecord', text: '지난매칭' },
            { value: 'rejectedRecord', text: '취소된매칭' },
            { value: 'requestRecord', text: '보낸매칭' },
            { value: 'receiveRecord', text: '받은매칭' }]}
          selectedTab={selectedTab}
          onChangeSelectedTab={onChangeSelectedTab}
        />
      </TabList> */}

      <FilterList>
        <Filter
          key="period"
          label="매칭기간"
          value="period"
          items={[
            { value: 'scheduledRecord', text: '예정된매칭' },
            { value: 'lastRecord', text: '지난매칭' }]}
          onChange={onChangeTerm}
          checkList={term}
          />
        <Filter
          key="type"
          label="매칭유형"
          value="term"
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
        <MatchingCardListWrap>
          {schedules?.map((schedule) => {
            console.log('schedule: ', schedule);
            const startDate = format(schedule.start, 'yyyy년 MM월 dd일 HH:mm');
            const endDate = format(schedule.end, 'HH:mm');
            const date = [startDate, ' ~ ', endDate].join('');
            const friend = schedule?.friend?.id;
            const nickname = friend === me?.id
              ? schedule?.requester?.nickname
              : schedule?.friend?.nickname;
            const imageSrc = friend === me?.id
              ? schedule?.requester?.Image?.src
              : schedule?.friend?.Image?.src;
            return (
              <MatchingCard
                key={schedule.id}
                id={schedule.id}
                nickname={nickname}
                description={schedule.address}
                image={imageSrc ? `http://localhost:6015/${imageSrc}` : ''}
                date={date}
                actions={[{ icon: <RetweetOutlined />, key: 'rematch' },
                  { icon: <EditOutlined />, key: 'edit' }]}
                setShowModal={setShowModal}
                setModalType={setModalType}
              />
            );
          })}
        </MatchingCardListWrap>
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
      <ModalMatchingDetail
        show={showModal}
        onCancel={onChangeShowModal}
        type={modalType}
        selectedTab={selectedTab}
      />
    </RecordWrap>
  );
};

export default MatchingRecord;
