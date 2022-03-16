import styled from 'styled-components';

export const InfoFormWrapper = styled.div`
  width: 100%;
  padding: 10px 100px;
  @media (max-width: 767px) {
    padding: 10px 0;
  }
  & > form > div {
    height: 100px;
    margin: 0 auto;
    max-width: 600px;
    & > div,
    & > span {
      margin-top: 10px;
    }
  }
`;

export const ButtonWrap = styled.div`
  margin-top: 20px !important;
  text-align: center;
`;
