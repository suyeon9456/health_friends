import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import CustomPickerInput from '../CustomPickerInput';
import CustomHeader from '../CustomHeader';
import { HeaderWrap, Prev, PrevButton, HeaderView, SuperPrevButton } from './style';
import styles from '../../../../SCSS/InputDatePicker.scss';

const InputDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  // const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
      withPortal
      customInput={<CustomPickerInput type="date" />}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <HeaderWrap className="test">
          <PrevButton onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <Prev />
          </PrevButton>
          <HeaderView>
            dfdf
          </HeaderView>
        </HeaderWrap>
        // <div
        //   style={{
        //     margin: 10,
        //     display: "flex",
        //     justifyContent: "center",
        //   }}
        // >
        //   <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        //     {"<"}
        //   </button>

        //   <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        //     {">"}
        //   </button>
        // </div>
      )}
    />
  );
};

export default InputDatePicker;
