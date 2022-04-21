import React, { useCallback, useEffect, useState } from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useQuery } from 'react-query';
import { CalendarScheduleAPI, CalendarEvent } from '@/../@types/schedule';
import { useSelector } from 'react-redux';
import { profileSelector } from '@/../reducers/profile';
import { loadCalendarScheduleAPI } from '@/api/schedule';
import { formatDateTime } from '@/../@utils/date';
import useSelectRage from '@/hooks/useSelectRage';
import { meSelector } from '@/../reducers/user';
import { CalendarWrap, CardWrap } from './style';
import { BigCalendar, SimpleMatchingCard } from '../../../molecules';

const MatchingCalendar = ({ isProfile }: { isProfile?: boolean }) => {
  const { profile } = useSelector(profileSelector);
  const me = useSelector(meSelector);
  const [range, onChangeRange] = useSelectRage();

  const [showCard, setShowCard] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const { data: apiEvents } = useQuery<CalendarScheduleAPI[]>(
    ['calendar', range],
    () =>
      loadCalendarScheduleAPI({
        range,
        profileId: isProfile ? profile.id : null,
      }),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const onSelectEvent: (event: {
    nickname: string;
    address: string;
    start: Date;
  }) => void = useCallback((event) => {
    setNickname(event.nickname);
    setAddress(event.address);
    setDate(formatDateTime(event.start));
    setShowCard(true);
  }, []);

  const onChangeShowCard = useCallback(() => {
    setShowCard(false);
  }, [showCard]);

  useEffect(() => {
    if (apiEvents) {
      setEvents(
        apiEvents?.map((schedule) => {
          const eventNickname =
            schedule.Receiver?.id === me?.id
              ? schedule.Requester.nickname
              : schedule.Receiver.nickname;
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
        onRangeChange={onChangeRange}
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
