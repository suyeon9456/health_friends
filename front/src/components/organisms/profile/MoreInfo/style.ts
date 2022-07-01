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
