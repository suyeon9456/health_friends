import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import { profileSelector } from '@/../reducers/profile';
import { changeIsShowModal } from '@/../reducers/user';
import useSelectRage from '@/hooks/useSelectRage';
import { loadCalendarScheduleAPI } from '@/api/schedule';
import { formatDateTime } from '@/../@utils/date';
import { CalendarScheduleAPI, CalendarEvent } from '@/../@types/schedule';
import { AxiosError } from 'axios';
import { BigCalendar, SimpleMatchingCard } from '../../../molecules';
import { CalendarWrap, CardWrap } from './style';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import GlobalCustomModal from '../../GlobalCustomModal';

const CALENDAR = 'CALENDAR' as const;
const MatchingCalendar = ({ isProfile }: { isProfile?: boolean }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector(profileSelector);
  const [range, onChangeRange] = useSelectRage();
  const [nickname, setNickname] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const { data: apiEvents } = useQuery<
    CalendarScheduleAPI[] | undefined,
    AxiosError
  >(
    ['calendar', range],
    () =>
      loadCalendarScheduleAPI({
        range,
        profileId: isProfile ? profile?.id : null,
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
    dispatch(changeIsShowModal(CALENDAR));
  }, []);

  const onChangeShowCard = useCallback(() => {
    dispatch(changeIsShowModal(null));
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
  }, [apiEvents]);

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
