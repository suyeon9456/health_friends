import styled from 'styled-components';

export const MatchingCardListWrap = styled.div`
  width: auto;
  margin: 10px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, auto));
  gap: 10px;
  @media (max-width: 767px) {
    grid-template-columns: repeat(auto-fill, minmax(50%, auto));
  }
  & > div {
    width: auto !important;
  }
`;
