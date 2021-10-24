import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ko } from 'date-fns/locale';

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

// const ColoredDateCellWrapper =
// ({ children }) => React.cloneElement(React.Children.only(children), {
//   style: {
//     backgroundColor: 'red',
//   },
// });

const MatchingCalendar = () => {
  const myEventsList = [
    { start: new Date(), end: new Date(), title: 'today' },
  ];

  return (
    <CalendarWrap>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        components={{
          // timeSlotWrapper: ColoredDateCellWrapper,
        }}
      />
    </CalendarWrap>
  );
};

export default MatchingCalendar;
