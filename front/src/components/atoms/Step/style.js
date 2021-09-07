import styled, { css } from 'styled-components';

export const StepWrapper = styled.div`
  white-space: nowrap;
  position: relative;
  display: inline-block;
  flex: 1;
  overflow: hidden;
  vertical-align: top;
`;

export const StepIconWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 32px;
  height: 32px;
  margin: 0 8px 0 0;
  font-size: 16px;
  font-family: -apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji;
  line-height: 32px;
  text-align: center;
  border: 1px solid rgba(0,0,0,.25);
  border-radius: 32px;
  transition: background-color .3s,border-color .3s;
  border-color: var(--ant-primary-color); */
  & > span {
    position: relative;
    top: -1.5px;
    line-height: 1;
  }

  ${({ type }) => {
    if (type === 'finished') {
      return css`
        background-color: #fff;
        border-color: rgb(146,84,222);
        & > span {
          color: rgb(146,84,222);
        }
      `;
    }
    if (type === 'process') {
      return css`
        background-image: linear-gradient(to right,rgb(146,84,222) 0%,rgb(196,29,127) 100%);
        border-color: rgb(146,84,222);
        & > span {
          color: #fff;
        }
      `;
    }
    return css`
      background-color: #fff;
      border-color: #00000040;
      & > span {
        color: #00000040;
      }
    `;
  }}
`;

export const StepContentWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
`;

export const StepTitle = styled.div`
  position: relative;
  display: inline-block;
  padding-right: 16px;
  font-size: 16px;
  line-height: 32px;
  color: #000000d9;
`;

export const StepDescription = styled.div`
  color: #00000073;
  max-width: 140px;
  white-space: normal;
  font-size: 14px;
`;
