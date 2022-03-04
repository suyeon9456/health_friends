import React, { useEffect } from 'react';
import { Calendar, dateFnsLocalizer, DateLocalizer, EventProps, stringOrDate } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, compareAsc } from 'date-fns';
import { ko } from 'date-fns/locale';

import BigCalendarToolbar from '../BigCalendarToolbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvents } from 'calendar';

const locales: { ko: any } = { ko };

const localizer: DateLocalizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const formats = {
  weekdayFormat: (date: Date) => localizer.format(date, 'EEE', locales.ko),
  monthHeaderFormat: (date: Date) => localizer.format(date, 'yyyy년 MM월', locales.ko),
  dayRangeHeaderFormat: ({ start, end }: { start: Date, end: Date }) => [
    localizer.format(start, 'MM월 dd일', locales.ko), localizer.format(end, 'MM월 dd일', locales.ko)].join(' — '),
  // dayRangeHeaderFormat: ({ start, end }) => localizer.format(start, 'MM월 dd일', locales.ko) +
  // ' — ' + localizer.format(end, 'MM월 dd일', locales.ko),
  dayHeaderFormat: (date: Date) => localizer.format(date, 'yyyy년 MM월 dd일', locales.ko),
};

const Event = ({ event }: {
  event: {
    start: Date;
    nickname: string;
    desc?: string;
    isPermitted: boolean;
  }
}): JSX.Element => {
  // 오늘 일자보다 전 일자의 event는 -1을 리턴한다.
  const compareToday = compareAsc(new Date(event.start), new Date());
  return (
    <div className={[compareToday < 0 ? 'last-event-title' : 'event-title', event.isPermitted && 'before-permission'].join(' ')}>
      <span className="friend-nickname">
        <strong>{event.nickname}</strong>
        {event.desc}
      </span>
    </div>
  );
};

const BigCalendar = ({ events, onSelectEvent, onRangeChange }: {
  events?: CalendarEvents;
  onSelectEvent: (event: { nickname: string; address: string; start: Date }) => void;
  onRangeChange: (range: Date[] | { start: stringOrDate; end: stringOrDate }) => void;
}) => (
  <Calendar
    views={['month', 'week', 'day']}
    formats={formats}
    localizer={localizer}
    events={events}
    startAccessor="start"
    // endAccessor="end"
    style={{ height: 520, width: '100%' }}
    onSelectEvent={onSelectEvent}
    onRangeChange={onRangeChange}
    components={{
      event: Event,
      // agenda: { event: EventAgenda },
      toolbar: BigCalendarToolbar,
    }}
  />
);

export default BigCalendar;
