import styled from 'styled-components';

export const FormWrapper = styled.div`
  width: 100%;
  padding: 20px 100px;
  & > div {
    margin: 0 auto;
    margin-top: 20px;
    max-width: 600px;
    & > input, & > div, & > span {
      margin-top: 10px;
    }
  }
`;
