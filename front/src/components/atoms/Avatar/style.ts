import styled, { css } from 'styled-components';

interface Avatar {
  size: string | number;
  src?: string;
}

export const StyledAvatar = styled.span<Avatar>`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  overflow: hidden;
  color: #fff;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  background: #ccc;
  border-radius: 5px;

  ${({ size }) => {
    if (size === 'small') {
      return css`
        width: 24px;
        height: 24px;
        line-height: 24px;
        & > .anticon-user {
          font-size: 12px;
        }
      `;
    }
    if (size === 'large') {
      return css`
        width: 40px;
        height: 40px;
        line-height: 40px;
        & > .anticon-user {
          font-size: 20px;
        }
      `;
    }
    if (size !== 'default') {
      return css`
        width: ${size}px;
        height: ${size}px;
        line-height: ${size}px;
        & > .anticon-user {
          font-size: ${+size / 2}px;
        }
      `;
    }
    return css`
      width: 32px;
      height: 32px;
      line-height: 32px;

      & > .anticon-user {
        font-size: 16px;
      }
    `;
  }}

  ${({ src }) => src && css`
    background: 0 0;
    & > img {
      display: block;
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
        object-fit: cover;
    }
  `}
`;
