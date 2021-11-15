import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, compareAsc } from 'date-fns';
import { ko } from 'date-fns/locale';
import PropTypes from 'prop-types';

import 'react-big-calendar/lib/css/react-big-calendar.css';

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
  monthHeaderFormat: (date) => localizer.format(date, 'yyyy년 MM월', locales.ko),
  dayRangeHeaderFormat: ({ start, end }) => localizer.format(start, 'MM월 dd일', locales.ko) + ' — ' + localizer.format(end, 'MM월 dd일', locales.ko),
  dayHeaderFormat: (date) => localizer.format(date, 'yyyy년 MM월 dd일', locales.ko),
};

const Event = ({ event }) => {
  // 오늘 일자보다 전 일자의 event는 -1을 리턴한다.
  const compareToday = compareAsc(new Date(event.start), new Date());
  return (
    <div className={compareToday < 0 ? 'last-event-title' : 'event-title'}>
      <span className="friend-nickname">
        <strong>{event?.nickname}</strong>
        {event.desc}
      </span>
    </div>
  );
};

const EventAgenda = ({ event }) => (
  <span>
    <em style={{ color: 'magenta' }}>{event.title}</em>
    <p>{event.desc}</p>
  </span>
);

const BigCalendar = ({ events, onSelectEvent, onRangeChange }) => (
  <Calendar
    views={['month', 'week', 'day']}
    formats={formats}
    localizer={localizer}
    events={events}
    startAccessor="start"
    endAccessor="end"
    style={{ height: 520, width: '100%' }}
    onSelectEvent={onSelectEvent}
    onRangeChange={onRangeChange}
    components={{
      event: Event,
      agenda: { event: EventAgenda },
    }}
    tooltipAccessor="test"
  />
);

Event.propTypes = {
  event: PropTypes.object,
};

EventAgenda.propTypes = {
  event: PropTypes.object,
};

BigCalendar.propTypes = {
  events: PropTypes.array,
  onSelectEvent: PropTypes.func,
  onRangeChange: PropTypes.func,
};

export default BigCalendar;
