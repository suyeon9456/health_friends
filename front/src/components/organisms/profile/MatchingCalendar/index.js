import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import { LOAD_SCHEDULE_REQUEST } from '../../../../../reducers/schedule';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarWrap } from './style';

const locales = { ko };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const formats = {
  weekdayFormat: (date) => localizer.format(date, 'EEE', locales.ko),
};

const Event = ({ event }) => (
  <span className="event-title">
    <strong>{event?.nickname}</strong>
    {event.desc}
  </span>
);

const EventAgenda = ({ event }) => (
  <span>
    <em style={{ color: 'magenta' }}>{event.title}</em>
    <p>{event.desc}</p>
  </span>
);

const MatchingCalendar = ({ events }) => {
  const dispatch = useDispatch();
  const { schedules } = useSelector((state) => state.schedule);
  const scheduleList = useRef([]);
  let myEventsList = [
    { start: new Date('2021-10-26'), end: new Date('2021-10-26'), nickname: 'jaeuk1' },
    { start: new Date('2021-10-26'), end: new Date('2021-10-26'), nickname: 'jaeuk2' },
  ];

  useEffect(() => {
    dispatch({
      type: LOAD_SCHEDULE_REQUEST,
    });
  }, []);

  useEffect(() => {
    console.log('schedules', schedules);
    if (!_.isEmpty(schedules)) {
      console.log('??');
      myEventsList = schedules.map((schedule) => ({
        start: parse(schedule.date, 'yyyy/MM/dd kk:mm:ss', new Date(), { locale: ko }),
        end: parse(schedule.date, 'yyyy/MM/dd kk:mm:ss', new Date(), { locale: ko }),
        nickname: schedule.nickname,
      }));
      scheduleList.current = schedules.map((schedule) => ({
        start: parse(schedule.date, 'yyyy/MM/dd kk:mm:ss', new Date(), { locale: ko }),
        end: parse(schedule.date, 'yyyy/MM/dd kk:mm:ss', new Date(), { locale: ko }),
        nickname: schedule.nickname,
      }));
    }
  }, [schedules]);

  console.log('formats: ', localizer.format(new Date(), 'MMM'));
  return (
    <CalendarWrap>
      <div>{myEventsList[0].nickname}</div>
      <Calendar
        views={['month', 'week', 'day']}
        formats={formats}
        localizer={localizer}
        events={scheduleList.current}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 520, width: '100%' }}
        components={{
          event: Event,
          agenda: { event: EventAgenda },
        }}
      />
    </CalendarWrap>
  );
};

Event.propTypes = {
  event: PropTypes.object,
};

EventAgenda.propTypes = {
  event: PropTypes.object,
};

MatchingCalendar.propTypes = {
  events: PropTypes.array,
};

export default MatchingCalendar;
