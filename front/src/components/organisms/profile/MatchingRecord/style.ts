import styled from 'styled-components';

export const RecordWrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100% - 10px;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  @media (max-width: 767px) {
    margin-left: 0;
  }
  margin-left: 10px;
  margin-top: 10px;
  padding: 10px 0px;
  box-sizing: border-box;
  color: #000000d9;
  overflow: hidden;
`;

export const FilterList = styled.div`
  padding: 0 10px;
  position: relative;
  display: flex;
  min-height: 50px;
  margin-bottom: 10px;

  & > div:not(:first-child) {
    margin-left: 10px;
  }

  @media (max-width: 447px) {
    margin-left: 0;
    flex-wrap: wrap;
    & > div:last-child {
      margin-left: 0;
      margin-top: 5px;
    }
  }
`;

export const CancelYnCheckBoxWrap = styled.div`
  padding: 0 10px;
`;

export const RecordBody = styled.div<{ schedules: number }>`
  text-align: center;
  padding: 0 10px;
`;

export const RecordFooter = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  width: 100%;
`;
