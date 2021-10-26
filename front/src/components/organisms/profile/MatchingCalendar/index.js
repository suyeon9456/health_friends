import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, UserAddOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import * as _ from 'lodash';

import { LOAD_SCHEDULE_REQUEST } from '../../../../../reducers/schedule';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BigCalendar, SimpleMatchingCard } from '../../../molecules';
import { CalendarWrap, CardWrap } from './style';

const actions = [{ icon: <UserAddOutlined />, key: 'rematch' }, { icon: <EditOutlined />, key: 'edit' }];
const MatchingCalendar = () => {
  const dispatch = useDispatch();
  const { schedules } = useSelector((state) => state.schedule);
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
    // console.log('event 클릭', events);
    console.log(event);
    setNickname(event.nickname);
    setAddress(event.address);
    setDate(format(event.start, 'yyyy-MM-dd HH:mm'));
    setShowCard(true);
  }, []);

  const onChangeShowCard = useCallback(() => {
    setShowCard(false);
  }, [showCard]);

  useEffect(() => {
    dispatch({
      type: LOAD_SCHEDULE_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(schedules)) {
      setEvents(schedules);
    }
  }, [schedules]);

  return (
    <CalendarWrap>
      <BigCalendar events={events} onSelectEvent={onSelectEvent} />
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
