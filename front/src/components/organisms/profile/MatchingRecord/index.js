import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { EditOutlined, PlusOutlined, RetweetOutlined } from '@ant-design/icons';

import { LOAD_SCHEDULES_REQUEST } from '../../../../../reducers/schedule';
import { Button } from '../../../atoms';
import { Tabs, MatchingCard } from '../../../molecules';
import { RecordBody, RecordFooter, RecordWrap, TabList } from './style';
import ModalMatchingDetail from '../ModalMatchingDetail';

const MatchingRecord = () => {
  const { schedules } = useSelector((state) => state.schedule);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState('scheduledRecord');
  const [schedulesLimit, setSchedulesLimit] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('view');
  const onChangeSelectedTab = useCallback((tab) => () => {
    setSelectedTab(tab);
  }, [selectedTab]);

  const onMoreSchedule = useCallback(() => {
    setSchedulesLimit((prev) => prev + 3);
  }, [schedulesLimit]);

  const onChangeShowModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, [showModal]);

  useEffect(() => {
    dispatch({
      type: LOAD_SCHEDULES_REQUEST,
      data: { type: selectedTab, limit: schedulesLimit },
    });
  }, [selectedTab, schedulesLimit]);
  return (
    <RecordWrap>
      <TabList>
        <Tabs
          tabs={[
            { value: 'scheduledRecord', text: '예정된매칭' },
            { value: 'lastRecord', text: '지난매칭' },
            { value: 'rejectedRecord', text: '거절된매칭' }]}
          selectedTab="scheduledRecord"
          onChangeSelectedTab={onChangeSelectedTab}
        />
      </TabList>
      <RecordBody schedules={schedules.length}>
        {schedules?.map((schedule) => {
          const startDate = format(schedule.start, 'yyyy년 MM월 dd일 HH:mm');
          const endDate = format(schedule.end, 'HH:mm');
          const date = [startDate, ' ~ ', endDate].join('');
          return (
            <MatchingCard
              key={schedule.id}
              id={schedule.id}
              nickname={schedule.nickname}
              description={schedule.address}
              date={date}
              actions={[{ icon: <RetweetOutlined />, key: 'rematch' },
                { icon: <EditOutlined />, key: 'edit' }]}
              setShowModal={setShowModal}
              setModalType={setModalType}
            />
          );
        })}
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
      />
    </RecordWrap>
  );
};

export default MatchingRecord;
