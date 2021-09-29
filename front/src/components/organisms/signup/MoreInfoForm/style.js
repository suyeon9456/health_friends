import styled from 'styled-components';

export const MoreInfoFormWrapper = styled.div`
  width: 100%;
  padding: 10px 100px;
  & > div {
    margin: 0 auto;
    /* margin-top: 20px; */
    max-width: 600px;
    & > input, & > select {
      margin-top: 10px;
    }
    & > div, & > span {
      margin-top: 10px;
    }
  }
`;
