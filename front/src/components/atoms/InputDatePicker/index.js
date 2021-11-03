import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import CustomPickerInput from '../CustomPickerInput';
import CustomCalendar from '../CustomCalendar';

// const [startDate, setStartDate] = useState(new Date());
const InputDatePicker = ({ startDate, setStartDate }) => (
  <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    showTimeSelect
    timeFormat="HH:mm"
    timeIntervals={15}
    timeCaption="time"
    dateFormat="yyyy년 MM월 dd일 HH:mm"
    // withPortal
    customInput={<CustomPickerInput type="date" />}
    calendarContainer={CustomCalendar}
  />
);

InputDatePicker.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  setStartDate: PropTypes.func,
};

export default InputDatePicker;
