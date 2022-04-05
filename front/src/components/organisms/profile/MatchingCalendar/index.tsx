import React, { useCallback, useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, addDays } from 'date-fns';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useQueries } from 'react-query';
import axios from 'axios';
import { CalendarEvents } from 'calendar';
import { CalendarScheduleFetch } from '@/../@types/schedule';
import { Me } from '@/../@types/user';
import { useSelector } from 'react-redux';
import { profileSelector } from '@/../reducers/profile';
import { CalendarWrap, CardWrap } from './style';
import { BigCalendar, SimpleMatchingCard } from '../../../molecules';
import { useDateFormat } from '../../../../hooks';

const MatchingCalendar = ({ isProfile }: { isProfile?: boolean }) => {
  const { profile } = useSelector(profileSelector);
  const [range, setRange] = useState<{ start: Date; end: Date }>({
    start: addDays(startOfMonth(new Date()), -7),
    end: addDays(endOfMonth(new Date()), 7),
  });

  const [showCard, setShowCard] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [events, setEvents] = useState<CalendarEvents>([]);

  const [{ data: me }, { data: apiEvents, isLoading }] = useQueries<
    [{ data: Me }, { data: CalendarScheduleFetch[] }]
  >([
    {
      queryKey: ['user'],
      queryFn: async () => {
        const { data } = await axios.get('/user');
        return data;
      },
    },
    {
      queryKey: ['calendar', range],
      queryFn: async () => {
        const { start, end } = range;
        const userId = isProfile ? `userId=${profile?.id}&` : '';
        const { data } = await axios.get(
          `/schedules/calendar?${userId}start=${useDateFormat(
            start,
            'yyyy-MM-dd'
          )}&end=${useDateFormat(end, 'yyyy-MM-dd')}`
        );
        return data;
      },
    },
  ]);

  const onSelectEvent: (event: {
    nickname: string;
    address: string;
    start: Date;
  }) => void = useCallback((event) => {
    setNickname(event.nickname);
    setAddress(event.address);
    setDate(format(event.start, 'yyyy-MM-dd HH:mm'));
    setShowCard(true);
  }, []);

  const onChangeShowCard = useCallback(() => {
    setShowCard(false);
  }, [showCard]);

  const onRangeChange = useCallback((eventRange: any) => {
    if (eventRange) {
      setRange(eventRange);
    }
  }, []);

  useEffect(() => {
    if (apiEvents) {
      setEvents(
        apiEvents?.map((schedule) => {
          const eventNickname =
            schedule?.Receiver?.id === me?.id
              ? schedule?.Requester?.nickname
              : schedule?.Receiver?.nickname;
          return {
            ...schedule,
            start: new Date(schedule.startDate),
            end: new Date(schedule.endDate),
            address: schedule.Gym.address,
            gymName: schedule.Gym.name,
            nickname: eventNickname,
          };
        })
      );
    }
  }, [apiEvents]);

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
            date={date}
            onChangeShow={onChangeShowCard}
          />
        </CardWrap>
      )}
    </CalendarWrap>
  );
};

export default MatchingCalendar;
