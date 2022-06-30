import styled, { css } from 'styled-components';

export const Button = styled.div<{ foldedGym: boolean }>`
  position: absolute;
  width: 20px;
  height: 60px;
  left: 50%;
  top: calc(100% - 20px);
  background-color: #fff;
  border-radius: 0 5px 5px 0;
  border: 1px solid #f0f0f0;
  border-left: none;
  text-align: center;
  box-shadow: 0 2px 8px #e8e9e9;
  cursor: pointer;
  transition: all 0.35s;
  transform: rotate(90deg);
  z-index: 100;

  & > span {
    color: #00000073;
    line-height: 56px;
  }
  &:hover {
    & > span {
      color: #b37feb;
    }
  }
  ${({ foldedGym }) =>
    foldedGym &&
    css`
      top: 34px !important;
    `}

  @media (min-width: 768px) {
    width: 20px;
    height: 60px;
    left: 100%;
    top: calc(50% - 50px + 10px);
    transform: none;
    ${({ foldedGym }) =>
      foldedGym &&
      css`
        top: calc(50% - 50px + 10px) !important;
        left: 41px !important;
      `}
  }
`;
