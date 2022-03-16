import styled, { css } from 'styled-components';

export const ModalRoot = styled.div`
  margin: 0;
  padding: 0;
`;

export const ModalMask = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 6;
  height: 100%;
  background-color: #00000073;
`;

export const ModalWrap = styled.div<{ show?: boolean }>`
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  position: fixed;
  z-index: 1060;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  flex-direction: row;
  justify-content: center;
  padding: 0.625em;
  overflow-x: hidden;
  transition: background-color 0.1s;
`;

export const ModalBox = styled.div`
  position: relative;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  pointer-events: none;
  position: relative;
  /* top: 100px; */
  max-width: calc(100vw - 32px);
  margin: 0 auto;
  width: 520px;
  transform-origin: 129.6px 242px;
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  background-clip: padding-box;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
    0 9px 28px 8px #0000000d;
  pointer-events: auto;
`;

export const ModalClose = styled.button<{
  onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}>`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  padding: 0;
  color: #00000073;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  background: 0 0;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: color 0.3s;
  -webkit-appearance: button;

  & > * {
    display: block;
    width: 56px;
    height: 56px;
    font-size: 16px;
    font-style: normal;
    line-height: 56px;
    text-align: center;
    text-transform: none;
    text-rendering: auto;
  }
`;

export const ModalHeader = styled.div`
  padding: 16px 24px;
  color: #000000d9;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 2px 2px 0 0;
`;

export const ModalTitle = styled.div`
  margin: 0;
  color: #000000d9;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  word-wrap: break-word;
`;

export const ModalBody = styled.div`
  /* padding: 24px 0; */
  font-size: 14px;
  line-height: 1.5715;
  word-wrap: break-word;
  text-align: left;
`;

export const ModalFooter = styled.div`
  padding: 10px 16px;
  text-align: right;
  background: 0 0;
  border-top: 1px solid #f0f0f0;
  border-radius: 0 0 2px 2px;

  & > button:not(:last-child) {
    margin-right: 10px;
  }
`;
