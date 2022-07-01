import styled from 'styled-components';

export const InfoWrapper = styled.section`
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
  }
`;

export const InfoHeader = styled.div`
  position: relative;
  padding: 16px 24px;
  color: #000000d9;
`;

export const InfoBody = styled.div`
  display: table;
  position: relative;
  padding: 16px 24px;
`;

export const InfoContentWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
