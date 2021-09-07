import styled from 'styled-components';

export const MapWrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  height: 500px;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  margin-top: 10px;
  
  @media (min-width: 768px) {
    width: 100% - 10px;
    height: 100%;
    margin-left: 10px;
  }
`;
