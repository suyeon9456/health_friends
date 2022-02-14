import React from 'react';
import { CalendarContainer } from 'react-datepicker';

import { CalendarBody, CalendarWrap } from './style';

const CustomCalendar = ({ children }: { children: React.ReactNode }) => (
  <CalendarWrap>
    <CalendarContainer>
      <CalendarBody>{children}</CalendarBody>
    </CalendarContainer>
  </CalendarWrap>
);

export default CustomCalendar;
