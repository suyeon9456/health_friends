import styled from 'styled-components';

export const CalendarWrap = styled.div`
  overflow: hidden;
  vertical-align: top;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  transition: margin .3s;
`;

export const CalendarBody = styled.div`
  position: relative;

    & > .react-datepicker__navigation {
      top: 19px;
      & > .react-datepicker__navigation-icon {
        &::before {
          border-color: #00000040;
          border-width: 1.5px 1.5px 0 0;
          width: 7px;
          height: 7px;
        }
      }
    }
  
  & > .react-datepicker__month-container {
    & > .react-datepicker__header {// calendar header
      background-color: #fff;
      color: #000000d9;
      border-bottom: 1px solid #f0f0f0;
      & > .react-datepicker__current-month {
        padding: 0;
        color: #000000d9;
        line-height: 40px;
        background: 0 0;
        border: 0;
        cursor: pointer;
        transition: color .3s;
        font-weight: 500;
      }
    }

    & > .react-datepicker__month {// calendar body
      padding: 8px 12px;
      margin: 0;
      & > .react-datepicker__week {// week
        & > .react-datepicker__day {// day
          position: relative;
          min-width: 24px;
          height: 24px;
          font-weight: 400;
          line-height: 15px;
          padding: 3px 0;
          color: #000000d9;
          cursor: pointer;
          border-radius: 2px;
          &:hover { // day hover
            background-color: #f5f5f5;
          }
        }
        & > .react-datepicker__day--outside-month {
          position: relative;
          min-width: 24px;
          font-weight: 400;
          line-height: 15px;
          padding: 3px 0;
          color: #00000040;
          cursor: pointer;
        }

        & > .react-datepicker__day--selected {
          background-color: #fff;
          border: 1px solid #9254de;
          border-radius: 2px;
        }

        & > .react-datepicker__day--today {
          font-weight: 500;
          line-height: 14px;
        }
      }
    }
  }

`;
