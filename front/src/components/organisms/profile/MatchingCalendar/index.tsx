import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { EditOutlined, UserAddOutlined } from '@ant-design/icons';
import { format, startOfMonth, endOfMonth, addDays } from 'date-fns';
import * as _ from 'lodash';

import { useDateFormat } from '../../../../hooks';

import { userSelector } from '@/../reducers/user';
import { BigCalendar, SimpleMatchingCard } from '../../../molecules';
import { CalendarWrap, CardWrap } from './style';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useQuery } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { CalendarEvents } from 'calendar';
import { CalendarScheduleFetch } from '@/../@types/schedule';

const actions = [{ icon: <UserAddOutlined />, key: 'rematch' }, { icon: <EditOutlined />, key: 'edit' }];
const MatchingCalendar = () => {
  const { me } = useSelector(userSelector);

  const [range, setRange] = useState<{ start: Date; end: Date; }>({
    start: addDays(startOfMonth(new Date()), -7),
    end: addDays(endOfMonth(new Date()), 7)
  });
  
  const [showCard, setShowCard] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const { status,
    isLoading,
    error,
    data: events,
    isFetching } = useQuery<CalendarEvents | undefined, AxiosError>(['calendar', range], async() => {
      const { start, end } = range;
      const { data }: AxiosResponse<Array<CalendarScheduleFetch>> = await axios.get(
        `/schedules/calendar?start=${useDateFormat(start, 'yyyy-MM-dd')}&end=${useDateFormat(end, 'yyyy-MM-dd')}`
      );

      return data?.map((schedule) => {
        const eventNickname = schedule?.Receiver?.id === me?.id
          ? schedule?.Requester?.nickname
          : schedule?.Receiver?.nickname;
        return {
          ...schedule,
          start: new Date(schedule.startDate),
          end: new Date(schedule.endDate),
          address: schedule.Gym.address,
          gymName: schedule.Gym.name,
          nickname: eventNickname
        };
      });
    }, { initialData: [] });

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
      setRange(range);
    }
  }, []);

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
