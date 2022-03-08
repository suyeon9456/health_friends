import React, { Dispatch, SetStateAction } from "react";
import { FieldError } from "react-hook-form";

export type Size = 'small' | 'large';
export type PickerType = 'date' | 'time';
export type StepType = 'wait' | 'finished' | 'process';
export type Type =
  | 'default'
  | 'primary'
  | 'error'
  | 'success'
  | 'warning'
  | 'line-primary'
  | 'signature'
  | 'text';

export interface AvatarProps {
  size?: Size | 'default' | number;
  src?: string;
  style?: React.CSSProperties;
}

export interface ButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactElement;
  size?: Size | 'default';
  type?: Type;
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
  type?: 'date' | 'time';
  size?: Size;
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
  size?: Size | 'default';
  name?: string,
  type?: 'text' | 'password';
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
  size?: Size | 'default';
  enterButton?: boolean;
  onChange: (e: ChangeEvent) => void;
  onSearch: () => void;
}

export interface SelectProps {
  size?: Size | 'default';
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
  size?: Size;
}

export interface RangePickerProps {
  size?: Size;
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

