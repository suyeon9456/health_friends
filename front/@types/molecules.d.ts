import { Control, FieldError, Path } from 'react-hook-form';
import { InputTypeT, ModalStatusType, SizeTypeT } from './constant';

export type AlertType = 'error' | 'warning' | 'success';

export interface BasicPopupProps {
  show?: boolean;
  message?: string;
  action: React.ReactElement;
}

export interface AlertProps extends BasicPopupProps {
  type?: ModalStatusType;
}

export interface ConfirmProps extends BasicPopupProps {
  onCancel: () => void;
}

export interface FormInputProps<T> {
  label?: string;
  id: Path<T>;
  size?: SizeTypeT;
  type?: InputTypeT;
  placeholder?: string;
  essential?: boolean;
  control?: Control<T, object>;
  // error?: FieldError | undefined;
  error?: Merge<FieldError, FieldErrorsImpl<DeepRequired<any>>> | undefined;
  disabled?: boolean;
}
