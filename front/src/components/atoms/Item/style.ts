import styled from 'styled-components';

export const ItemCard = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  outline: none;
`;

export const ItemWrap = styled.li`
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  padding: 12px 10px;
  color: #000000d9;
  outline: none;
`;

export const ItemContent = styled.div`
  color: #000000d9;
  outline: none;
`;

export const ItemTitle = styled.h4`
  margin-bottom: 4px;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  outline: none;

  & > a {
    color: #000000d9;
    transition: all 0.3s;
    cursor: pointer;
  }
`;

export const ItemDescription = styled.div`
  color: #00000073;
  font-size: 14px;
  line-height: 1.5715;
  outline: none;

  & button {
    margin-left: 0;
    padding-left: 10px;
    color: #00000073;
  }
`;

export const LoadingItemTitle = styled.h4`
  display: inline-block;
  position: relative;
  background: rgba(190, 190, 190, 0.2);
  border-radius: 2px;
  margin-bottom: 4px;
  outline: none;
  width: 150px;
  height: 22px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgb(190 190 190 / 0%) 25%,
      rgba(129, 129, 129, 0.2) 35%,
      rgb(190 190 190 / 0%) 65%
    );
    animation: loading 2.5s infinite;
    @keyframes loading {
      0% {
        transform: translateX(-150%);
      }
      50% {
        transform: translateX(-60%);
      }
      100% {
        transform: translate(150%);
      }
    }
  }
`;

export const LoadingItemDescription = styled.div`
  display: inline-block;
  position: relative;
  background: rgba(190, 190, 190, 0.2);
  border-radius: 2px;
  outline: none;
  width: 250px;
  height: 16px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgb(190 190 190 / 0%) 25%,
      rgba(129, 129, 129, 0.2) 35%,
      rgb(190 190 190 / 0%) 65%
    );
    animation: loading 2.5s infinite;
    @keyframes loading {
      0% {
        transform: translateX(-150%);
      }
      50% {
        transform: translateX(-60%);
      }
      100% {
        transform: translate(150%);
      }
    }
  }
`;
