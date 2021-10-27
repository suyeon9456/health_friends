import styled, { css } from 'styled-components';

export const RecordWrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100% - 10px;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  margin-left: 10px;
  margin-top: 10px;
  padding: 10px 0px;
  box-sizing: border-box;
  color: #000000d9;
  overflow: hidden;
`;

export const TabList = styled.div`
  position: relative;
  display: flex;
  flex: none;
  align-items: flex-end;
  &::before {
    position: absolute;
    right: 0;
    left: 0;
    border-bottom: 1px solid #f0f0f0;
    content: "";
  }
`;

export const RecordBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* align-content: space-around;
  justify-content: space-around; */
  padding: 20px 20px;

  & > div {
    width: 45%;
    margin-bottom: 20px;
    @media (min-width: 768px) {
      /* flex: 1 1 30%; */
      width: 30%;
    }
  }

  ${({ schedules }) => {
    switch (schedules % 2) {
      case 0:
        return css`
          justify-content: space-around;
          `;
      default:
        return css`
          justify-content: flex-start;
          & > div {
            margin: 0 14px;
            margin-bottom: 20px;
          }
        `;
    }
  }}

  @media (min-width: 768px) {
    ${({ schedules }) => {
    console.log('full');
    switch (schedules % 3) {
      case 0:
        return css`
          /* align-content: space-around; */
          justify-content: space-between;
          & > div {
            margin: 0;
          }
          `;
      default:
        return css`
          /* align-content: space-around; */
          justify-content: flex-start;
          & > div {
            margin: 0 5px;
          }
        `;
    }
  }}
  }
`;

export const RecordFooter = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  width: 100%;
`;
