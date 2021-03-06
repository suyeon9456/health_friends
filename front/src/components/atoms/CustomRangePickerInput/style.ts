import styled from 'styled-components';

export const RangePickerWrap = styled.div`
  box-sizing: border-box;
  margin: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  padding: 4px 11px;
  width: 100%;
  position: relative;
  display: inline-flex;
  align-items: center;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: border 0.3s, box-shadow 0.3s;

  &:hover,
  &:focus {
    border-color: #40a9ff;
    border-right-width: 1px !important;
  }
  &:focus-within {
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

export const PickerInputWrap = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
`;

export const PickerInput = styled.input<{
  className: string;
  value?: string;
  onClick?: () => void;
  ref: React.ForwardedRef<HTMLInputElement>;
  placeholder?: string;
}>`
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
  flex: auto;
  min-width: 1px;
  height: auto;
  padding: 0;
  background: 0 0;
  border: 0;
  touch-action: manipulation;
  outline: none;
`;

export const RangeSeparator = styled.div`
  /* align-items: center; */
  padding: 0 8px;
  line-height: 1;
  position: absolute;
  left: 80px;
`;

export const SeparatorWrap = styled.span`
  position: relative;
  display: inline-block;
  width: 1em;
  height: 16px;
  color: #00000040;
  font-size: 16px;
  vertical-align: top;
  cursor: default;
`;

export const ActiveBar = styled.div`
  bottom: -1px;
  height: 2px;
  margin-left: 11px;
  background: #1890ff;
  /* opacity: 0; */
  transition: all 0.3s ease-out;
  pointer-events: none;
  left: 0px;
  width: 70px;
  position: absolute;
`;

export const PickerSuffix = styled.span`
  align-self: center;
  margin-left: 4px;
  color: #00000040;
  line-height: 1;
  pointer-events: none;
`;
