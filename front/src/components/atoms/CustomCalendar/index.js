import React from 'react';
import PropTypes from 'prop-types';
import { CalendarContainer } from 'react-datepicker';

import { CalendarBody, CalendarWrap } from './style';

const CustomCalendar = ({ children }) => (
  <CalendarWrap>
    <CalendarContainer>
      <CalendarBody>{children}</CalendarBody>
    </CalendarContainer>
  </CalendarWrap>
);

CustomCalendar.propTypes = {
  children: PropTypes.node,
};

export default CustomCalendar;
