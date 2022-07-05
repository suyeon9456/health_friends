import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import { hiddenCustomModal, showCustomModal } from '@/../reducers/user';
import useSelectRage from '@/hooks/useSelectRage';
import { loadCalendarScheduleAPI } from '@/api/schedule';
import { formatDateTime } from '@/../@utils/date';
import { CalendarScheduleAPI, CalendarEvent } from '@/../@types/schedule';
import { AxiosError } from 'axios';
import useGetProfile from '@/hooks/useGetProfile';
import { BigCalendar, SimpleMatchingCard } from '../../../molecules';
import { CalendarWrap, CardWrap } from './style';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import GlobalCustomModal from '../../GlobalCustomModal';

const CALENDAR = 'CALENDAR' as const;
const MatchingCalendar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [range, onChangeRange] = useSelectRage();
  const [nickname, setNickname] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const { data: profile } = useGetProfile();

  const profileId = useMemo(() => {
    return router.pathname !== '/myinfo' ? profile?.id : null;
  }, [router.pathname]);

  const { data: apiEvents } = useQuery<
    CalendarScheduleAPI[] | undefined,
    AxiosError
  >(
    ['calendar', range],
    () =>
      loadCalendarScheduleAPI({
        range,
        profileId,
      }),
    { refetchOnWindowFocus: false }
  );

  const onSelectEvent: (event: {
    nickname: string;
    address: string;
    start: Date;
  }) => void = useCallback((event) => {
    setNickname(event.nickname);
    setAddress(event.address);
    setDate(formatDateTime(event.start));
    dispatch(showCustomModal(CALENDAR));
  }, []);

  const onChangeShowCard = useCallback(() => {
    dispatch(hiddenCustomModal(CALENDAR));
  }, []);

  useEffect(() => {
    if (apiEvents) {
      setEvents(
        apiEvents?.map((schedule) => {
          const eventNickname =
            schedule.Receiver?.id === profile?.id
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
  }, [apiEvents, profile?.id]);

  return (
    <CalendarWrap>
      <BigCalendar
        events={events}
        onSelectEvent={onSelectEvent}
        onRangeChange={onChangeRange}
      />
      <GlobalCustomModal id={CALENDAR}>
        <CardWrap>
          <SimpleMatchingCard
            nickname={nickname}
            address={address}
            date={date}
            onChangeShow={onChangeShowCard}
          />
        </CardWrap>
      </GlobalCustomModal>
    </CalendarWrap>
  );
};

export default MatchingCalendar;
