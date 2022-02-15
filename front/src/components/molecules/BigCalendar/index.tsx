import React from 'react';
import { Calendar, dateFnsLocalizer, DateLocalizer, EventProps } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, compareAsc } from 'date-fns';
import { ko } from 'date-fns/locale';

import BigCalendarToolbar from '../BigCalendarToolbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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

// const EventAgenda = ({ event }: { event: { title: string; desc: string; } }) => (
//   <span>
//     <em style={{ color: 'magenta' }}>{event.title}</em>
//     <p>{event.desc}</p>
//   </span>
// );

const BigCalendar = ({ events, onSelectEvent, onRangeChange }: {
  events: Array<{
    Cancel?: {
      RequestId: number;
      ResponseId: number;
      ScheduleId: number;
      createdAt: string;
      id: number;
      isCanceled: boolean;
      updatedAt: string;
    };
    Friend: {id: number; nickname: string; Image: object};
    Gym: {address: string};
    Requester: {id: number; nickname: string; Image: object};
    address: string;
    description: string
    end: Date;
    endDate: string;
    gymName?: string;
    id: number;
    isPermitted: boolean;
    nickname: string;
    permission: boolean;
    start: Date;
    startDate: boolean;
  }>;
  onSelectEvent: () => void;
  onRangeChange: () => void;
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
