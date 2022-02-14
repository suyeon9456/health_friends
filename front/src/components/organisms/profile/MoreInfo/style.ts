import styled from 'styled-components';

export const MoreInfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100% - 10px;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  margin-left: 10px;
  margin-top: 10px;

  @media (max-width: 767px) {
    margin-left: 0;
    margin-bottom: 10px;
  }
`;

export const MoreInfoBody = styled.div`
  display: table;
  position: relative;
  padding: 20px 0;
`;

export const MoreInfoContent = styled.div`
  display: table-cell;
  width: 50%;
  padding: 0 24px;

  &:not(:last-child) {
    border-right: 1px solid #f0f0f0;
  }

  @media (max-width: 865px) {
    display: block;
    width: 100%;
    padding: 24px 24px 0 24px;
    &:not(:last-child) {
      border-right: none;
      border-bottom: 1px solid #f0f0f0;
      padding: 0 24px 24px 24px;
    }
    /* margin-left: 0;
    margin-bottom: 10px; */
  }
`;

export const ContentTitle = styled.div`
  display: table;
  & > h4 {
    display: table-cell;
    width: 100%;
    font-weight: 600;
  }
`;

export const Content = styled.div`
  padding-top: 20px;
  & > div:not(:last-child) {
    margin-bottom: 10px;
  }
`;
