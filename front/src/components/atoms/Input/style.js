import styled, { css } from 'styled-components';

export const InputWrap = styled.span`
  position: relative;
  width: 100%;
  min-width: 0;
  /* padding: 4px 11px; */
  padding-right: 6px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
  display: inline-flex;

  &:hover, &:focus {
    border-color: #40a9ff;
    border-right-width: 1px !important;
  }
  &:focus-within {
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & > input {
    border: none;
    outline: none;
  }
  & > span {
    margin-left: 4px;
    display: flex;
    flex: none;
    align-items: center;
  }

  & > span > .anticon {
    cursor: pointer;
  }

  ${({ validationState }) => validationState === 'error'
    && css`
      background-color: #fff;
      border-color: #ff4d4f;
      &:hover {
        border-color: #ff7875;
      }
      &:focus-within {
        border-color: #ff7875;
        box-shadow: 0 0 0 2px rgb(255 77 79 / 20%);
        border-right-width: 1px!important;
        outline: 0;
      }
  `}
`;

export const InputControlWrap = styled.div`

`;

export const InputWrapBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 32px;
`;

export const InputContent = styled.div`
  flex: auto;
  max-width: 100%;
`;

export const InputContainer = styled.input`
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all .3s;

  ${({ size }) => {
    if (size === 'small') {
      return css`
        height: 24px;
      `;
    }
    if (size === 'large') {
      return css`
        height: 40px;
      `;
    }
    return css`
      height: 32px;
    `;
  }}

  ${({ passwordType }) => passwordType !== 'password' && css`
    &:hover, &:focus {
      border-color: #40a9ff;
      border-right-width: 1px !important;
    }
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  `}

  ${({ validationState, passwordType }) => validationState === 'error'
    && passwordType !== 'password'
    && css`
      background-color: #fff;
      border-color: #ff4d4f;
      &:hover {
        border-color: #ff7875;
      }
      &:focus {
        border-color: #ff7875;
        box-shadow: 0 0 0 2px rgb(255 77 79 / 20%);
        border-right-width: 1px!important;
        outline: 0;
      }
  `}
`;

export const ValidationIconWrap = styled.span`
  position: absolute;
  top: 50%;
  right: 0;
  z-index: 1;
  width: 32px;
  height: 20px;
  margin-top: -10px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  visibility: visible;
  -webkit-animation: zoomIn .3s cubic-bezier(.12,.4,.29,1.46);
  animation: zoomIn .3s cubic-bezier(.12,.4,.29,1.46);
  pointer-events: none;
  animation-name: diffZoomIn2!important;
  color: #ff4d4f;
  ${({ validationState }) => validationState === 'success' && css`
      color: #52c41a;
  `}
`;

export const FeedbackWrap = styled.div`
  height: auto;
  min-height: 24px;
  opacity: 1;
  clear: both;
  color: #00000073;
  font-size: 14px;
  line-height: 1.5715;
  transition: color .3s cubic-bezier(.215,.61,.355,1);
`;

export const Feedback = styled.div`
  color: #ff4d4f;
`;
