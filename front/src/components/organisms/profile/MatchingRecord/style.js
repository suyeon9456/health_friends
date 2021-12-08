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

// export const TabList = styled.div`
//   position: relative;
//   display: flex;
//   flex: none;
//   align-items: flex-end;
//   &::before {
//     position: absolute;
//     right: 0;
//     left: 0;
//     border-bottom: 1px solid #f0f0f0;
//     content: "";
//   }
// `;

export const FilterList = styled.div`
  padding: 0 10px;
  position: relative;
  display: flex;
  min-height: 50px;
  margin-bottom: 10px;
  
  & > div:not(:first-child) {
    margin-left: 10px;
  }
`;

export const CancelYnCheckBoxWrap = styled.div`
  padding: 0 10px;
`;

export const RecordBody = styled.div`
  /* display: flex;
  flex-wrap: wrap; */
  /* align-content: space-around; */
  /* justify-content: center; */
  /* padding: 20px 20px; */
  text-align: center;
  /* width: 100%; */
`;

export const MatchingCardListWrap = styled.div`
  width: auto;
  display: flex;
  flex-wrap: wrap;

  & > div {
    width: 45%;
    margin: 10px;
    @media (min-width: 768px) {
      /* flex: 1 1 30%; */
      width: 30%;
    }
  }
`;

export const RecordFooter = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  width: 100%;
`;
