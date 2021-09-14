import styled, { css } from 'styled-components';

export const StyledTag = styled.span`
    box-sizing: border-box;
    margin: 0 8px 0 0;
    color: #000000d9;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: "tnum";
    display: inline-block;
    height: auto;
    padding: 0 7px;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    background: #fafafa;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    opacity: 1;
    transition: all .3s;

    ${({ type }) => {
    if (type === 'gender') {
      return css`
        color: #c41d7f;
        background: #fff0f6;
        border-color: #ffadd2;
      `;
    }
    if (type === 'age') {
      return css`
        color: #d48806;
        background: #fffbe6;
        border-color: #ffe58f;
      `;
    }
    if (type === 'career') {
      return css`
        color: #08979c;
        background: #e6fffb;
        border-color: #87e8de;
      `;
    }
    if (type === 'position') {
      return css`
        color: #096dd9;
        background: #e6f7ff;
        border-color: #91d5ff;
      `;
    }
  }}
`;
