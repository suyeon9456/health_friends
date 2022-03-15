import styled from 'styled-components';

export const MapWrap = styled.section`
  position: relative;
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

  & > button {
    position: absolute;
    z-index: 1;
    bottom: 10px;
    left: 10px;
    box-shadow: rgb(0 0 0 / 30%) 0px 2px 2px 0px;
  }
`;
