import styled from 'styled-components';

export const CreateFormWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;

  & label {
    font-size: 14px;
    font-weight: 500;
  }

  & > div:not(:first-child) {
    margin-top: 10px;
  }

  & > div > input, & > div > select {
    margin-top: 10px;
  }
`;
