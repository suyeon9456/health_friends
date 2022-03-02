export type AlertType = 'error' | 'warning' | 'success';

export interface BasicPopupProps {
  show: boolean;
  message: string;
  action: React.ReactElement;
}

export interface AlertProps extends BasicPopupProps {
  type?: AlertType;
}

export interface ConfirmProps extends BasicPopupProps {
  onCancel: () => void;
}