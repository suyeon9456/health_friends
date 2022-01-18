import styled from 'styled-components';

export const InfoFormWrapper = styled.div`
  width: 100%;
  padding: 10px 100px;
  @media (max-width: 767px) {
    padding: 10px 0;
  }
  & > form > div {
    margin: 0 auto;
    max-width: 600px;
    & > div, & > span {
      margin-top: 10px;
    }
  }
`;

export const ButtonWrap = styled.div`
  margin-top: 10px;
  text-align: center;
`;
