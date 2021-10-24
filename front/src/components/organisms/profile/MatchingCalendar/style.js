import styled from 'styled-components';

export const CalendarWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100% - 10px;
  /* height: 100%; */
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  margin-left: 10px;
  margin-top: 10px;
  padding: 30px 0px;

  & .rbc-month-view {
    border: 0;
  }
  
  & .rbc-header {
    font-weight: normal;
    margin: 0 12px 5px 0;
    border: 0;
    border-bottom: 2px solid #f0f0f0;
  }

  & .rbc-day-bg + .rbc-day-bg {
    border: 0;
  }

  & .rbc-month-row + .rbc-month-row {
    border-top: 2px solid #f0f0f0;
  }

  & .rbc-off-range-bg {
    background-color: #fff;
  }

  & .rbc-date-cell {
    margin: 0 12px 5px 0;
  }
`;
