import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, UserAddOutlined } from '@ant-design/icons';
import { format, startOfMonth, endOfMonth, addDays } from 'date-fns';
import * as _ from 'lodash';

import { RootState } from '@/../store/configureStore';
import { useDateFormat } from '../../../../hooks';

import { BigCalendar, SimpleMatchingCard } from '../../../molecules';
import { CalendarWrap, CardWrap } from './style';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Event } from 'react-big-calendar';
import { loadCalendarSchedulesRequest } from '@/../reducers/schedule';

const actions = [{ icon: <UserAddOutlined />, key: 'rematch' }, { icon: <EditOutlined />, key: 'edit' }];
const MatchingCalendar = () => {
  const dispatch = useDispatch();

  const { schedules } = useSelector((state: RootState) => state.schedule);
  const { me } = useSelector((state: RootState) => state.user);

  const [events, setEvents] = useState([]);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const onSelectEvent: (event: { nickname: string; address: string; start: Date }) => void = useCallback((event) => {
    setNickname(event.nickname);
    setAddress(event.address);
    setDate(format(event.start, 'yyyy-MM-dd HH:mm'));
    setShowCard(true);
  }, []);

  const onChangeShowCard = useCallback(() => {
    setShowCard(false);
  }, [showCard]);

  const onRangeChange = useCallback((range) => {
    if (range) {
      const { start, end } = range;
      dispatch(loadCalendarSchedulesRequest({
        start: useDateFormat(start, 'yyyy-MM-dd'),
        end: useDateFormat(end, 'yyyy-MM-dd'),
      }));
    }
  }, []);

  useEffect(() => {
    Promise.all([addDays(startOfMonth(new Date(2022, 0)), -7),
      addDays(endOfMonth(new Date(2022, 0)), 7)]).then((values) => {
      const [start, end] = values;
      dispatch(loadCalendarSchedulesRequest({
        start: useDateFormat(start, 'yyyy-MM-dd'),
        end: useDateFormat(end, 'yyyy-MM-dd')
      }));
    });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(schedules)) {
      setEvents(schedules.map((schedule: {
        Friend: { id: number, nickname: string },
        Requester: { nickname: string },
      }) => {
        const eventNickname = schedule?.Friend?.id === me?.id
          ? schedule?.Requester?.nickname
          : schedule?.Friend?.nickname;
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
