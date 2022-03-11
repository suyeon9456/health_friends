import React, { Dispatch, SetStateAction } from "react";
import { FieldError } from "react-hook-form";
import { BaseSizeTypeT, ButtonTypeT, InputTypeT, PickerTypeT, SizeTypeT } from "./utils";

export interface AvatarProps {
  size?: SizeTypeT | number;
  src?: string;
  style?: React.CSSProperties;
}

export interface ButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactElement;
  size?: SizeTypeT;
  type?: ButtonTypeT;
  name?: string;
  buttonLoading?: boolean;
  block?: boolean;
  disabled?: boolean;
  submit?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

export interface CheckBoxProps {
  label: string;
  value: string;
  onChange?: (event:  React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export interface CustomPickerInputProps {
  value?: string;
  type?: PickerTypeT;
  size?: BaseSizeTypeT;
  placeholder?: string;
  onClick?: () => void;
}

export interface FormProps {
  children: React.ReactNode;
  encType?: string;
  onSubmit?: () => void;
}

export interface BasicInputProps {
  value: string;
  loading?: boolean;
  placeholder?: string;
  onChange: (event:  React.ChangeEvent<HTMLInputElement>)  =>  void;
}

export interface InputProps extends BasicInputProps {
  size?: SizeTypeT;
  name?: string,
  type?: InputTypeT;
  disabled?: boolean;
  error?: FieldError | undefined;
}

export interface TextareaProps extends BasicInputProps {
  name: string;
  showCount?: boolean;
  maxLength?: number;
  onChange: () => void;
}

export interface SearchProps extends BasicInputProps {
  size?: SizeTypeT;
  enterButton?: boolean;
  onChange: (e: ChangeEvent) => void;
  onSearch: () => void;
}

export interface SelectProps {
  size?: SizeTypeT;
  options: readonly { readonly value: string | number; readonly text: string; }[];
  name: string;
  value: number | string;
  onChange: () => void;
}

export interface DatePickerInputProps {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  placeholder?: string;
}

export interface InputNumberProps {
  value: number;
  onChange: () => void;
  setValue: Dispatch<SetStateAction<string>>;
  size?: SizeTypeT;
}

export interface RangePickerProps {
  size?: BaseSizeTypeT;
  startDate: Date;
  endDate: Date;
  onChangeStartDate: (data: Date | null) => void;
  onChangeEndDate: (data: Date | null) => void;
}

export interface SliderButtonProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

