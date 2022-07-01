import styled from 'styled-components';

export const CalendarWrap = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100% - 10px;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  margin-left: 10px;
  @media (max-width: 767px) {
    margin-left: 0;
  }
  margin-top: 10px;
  padding: 30px 0px;

  .event-title {
    display: block;
    position: relative;
    font-size: 12px;
    font-weight: lighter;
    width: 100%;
    height: 100%;

    &::before {
      position: absolute;
      top: calc(50% - 2px);
      background-color: #faad14;
      border-radius: 50%;
      content: ' ';
      width: 5px;
      height: 5px;
    }
    & > .friend-nickname {
      padding-left: 10px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 12px;
      font-weight: lighter;
    }

    &,
    .before-permission {
      &::before {
        position: absolute;
        top: calc(50% - 2px);
        background-color: #ff4d4f;
        border-radius: 50%;
        content: ' ';
        width: 5px;
        height: 5px;
      }
    }
  }

  .last-event-title {
    display: block;
    position: relative;
    font-size: 12px;
    font-weight: lighter;
    width: 100%;
    height: 100%;

    &::before {
      position: absolute;
      top: calc(50% - 2px);
      background-color: #00000073;
      border-radius: 50%;
      content: ' ';
      width: 5px;
      height: 5px;
    }

    & > .friend-nickname {
      padding-left: 10px;
      color: #00000073;
      font-size: 12px;
      font-weight: lighter;
      text-decoration: line-through;
    }
  }

  & .rbc-toolbar {
    & > .rbc-btn-group {
      margin-bottom: 15px;
      & > button {
        height: 32px;
        border-radius: 2px;
        border: 1px solid #d9d9d9;
        border-top-width: 1.02px;
        font-size: 14px;
        cursor: pointer;

        &:not(:first-child) {
          border-left-width: 0;
        }

        &:not(:last-child) {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }

      & > .rbc-active {
        background: #e9d8fd;
        border-color: #b37feb;
        color: #9254de;
        box-shadow: none;
      }
    }
  }

  & .rbc-month-view {
    border: 0;
  }

  & .rbc-month-header {
    justify-content: space-between;

    & > .rbc-header {
      flex: none;
      width: 13%;
      font-weight: normal;
      border: 0;
      border-bottom: 2px solid #f0f0f0;
      padding: 0 12px 5px 0;
    }
  }

  /* & .rbc-header {
    flex: none;
    width: 13%;
    font-weight: normal;
    border: 0;
    border-bottom: 2px solid #f0f0f0;
    padding: 0 12px 5px 0;
  } */

  & .rbc-month-row {
    /* justify-content: space-between; */
    border: 0;

    & > .rbc-row-bg {
      justify-content: space-between;
      & .rbc-day-bg {
        flex: none;
        width: 13%;
        border: 0;
        border-bottom: 2px solid #f0f0f0;
        padding: 0 12px 0 0;
        /* &:not(:last-child) {
          margin: 0 12px 0 0;
        } */
      }
    }
  }

  & .rbc-off-range-bg {
    background-color: #fff;
  }

  & .rbc-month-view {
    padding: 0 12px;
  }

  /* & .rbc-row-bg {
    justify-content: space-between;
  } */

  & .rbc-row-content {
    & .rbc-row:first-child {
      justify-content: space-between;

      & > .rbc-date-cell {
        flex: none;
        width: 13%;
      }
    }
  }

  & .rbc-today {
    /* background-color: #e9d8fd; */
  }

  & .rbc-event {
    /* background-color: #faad14; */
    background-color: #fff0;
    color: black;
    padding: 0;
    /* padding-right: 5px; */
    /* padding: 0 5px;
    border-radius: 50px; */
  }

  & .rbc-day-slot .rbc-events-container {
    margin: 0;
  }

  & .rbc-day-slot .rbc-event {
    border-color: #b37feb;
    background: #e9d8fd;
    border-radius: 0;
    margin: 0;

    & > {
      width: 100%;
    }
  }
`;

export const CardWrap = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
