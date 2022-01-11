import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, UserAddOutlined } from '@ant-design/icons';
import { format, startOfMonth, endOfMonth, addDays } from 'date-fns';
import * as _ from 'lodash';

import { LOAD_CALENDAR_SCHEDULES_REQUEST } from '../../../../../reducers/schedule';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BigCalendar, SimpleMatchingCard } from '../../../molecules';
import { CalendarWrap, CardWrap } from './style';
import { useDateFormat } from '../../../../hooks';

const actions = [{ icon: <UserAddOutlined />, key: 'rematch' }, { icon: <EditOutlined />, key: 'edit' }];
const MatchingCalendar = () => {
  const dispatch = useDispatch();
  const { schedules } = useSelector((state) => state.schedule);
  const { me } = useSelector((state) => state.user);
  // let myEventsList = [
  //   { start: new Date('2021-10-26'), end: new Date('2021-10-26'), nickname: 'jaeuk1' },
  //   // { start: new Date('2021-10-26'), end: new Date('2021-10-26'), nickname: 'jaeuk2' },
  // ];
  const [events, setEvents] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [nickname, setNickname] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');

  const onSelectEvent = useCallback((event) => {
    setNickname(event.nickname);
    setAddress(event.address);
    setDate(format(event.start, 'yyyy-MM-dd HH:mm'));
    setShowCard(true);
  }, []);

  const onChangeShowCard = useCallback(() => {
    setShowCard(false);
  }, [showCard]);

  const onRangeChange = useCallback((changeDate) => {
    if (changeDate) {
      const { start, end } = changeDate;
      dispatch({
        type: LOAD_CALENDAR_SCHEDULES_REQUEST,
        data: { start: useDateFormat(start, 'yyyy-MM-dd'), end: useDateFormat(end, 'yyyy-MM-dd') },
      });
    }
  }, []);

  useEffect(() => {
    Promise.all([addDays(startOfMonth(new Date(2022, 0)), -7),
      addDays(endOfMonth(new Date(2022, 0)), 7)]).then((values) => {
      const [start, end] = values;
      dispatch({
        type: LOAD_CALENDAR_SCHEDULES_REQUEST,
        data: { start: useDateFormat(start, 'yyyy-MM-dd'), end: useDateFormat(end, 'yyyy-MM-dd') },
      });
    });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(schedules)) {
      setEvents(schedules.map((schedule) => {
        const eventNickname = schedule?.Friend?.id === me?.id
          ? schedule?.requester?.nickname
          : schedule?.friend?.nickname;
        return { ...schedule, nickname: eventNickname };
      }));
    }
  }, [schedules]);

  return (
    <CalendarWrap>
      <BigCalendar
        events={events}
        onSelectEvent={onSelectEvent}
        onRangeChange={onRangeChange}
      />
      {showCard && (
        <CardWrap>
          <SimpleMatchingCard
            nickname={nickname}
            address={address}
            actions={actions}
            date={date}
            onChangeShow={onChangeShowCard}
          />
        </CardWrap>
      )}
    </CalendarWrap>
  );
};

export default MatchingCalendar;
