import { ReactNode } from 'react';

export const InputNumberType = {
  PLUSE: 'PLUSE',
  MINUS: 'MINUS',
} as const;

export type InputNumberTypeT =
  typeof InputNumberType[keyof typeof InputNumberType];

export const SizeType = {
  DEFAULT: 'DEFAULT',
  SMALL: 'SMALL',
  LARGE: 'LARGE',
} as const;

export type SizeTypeT = typeof SizeType[keyof typeof SizeType];

export const BaseSizeType = {
  SMALL: 'SMALL',
  LARGE: 'LARGE',
} as const;

export type BaseSizeTypeT = typeof BaseSizeType[keyof typeof BaseSizeType];

export const ButtonType = {
  DEFAULT: 'DEFAULT',
  PRIMARY: 'PRIMARY',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  LINEPRIMARY: 'LINE-PRIMARY',
  SIGNATURE: 'SIGNATURE',
  TEXT: 'TEXT',
} as const;

export type ButtonTypeT = typeof ButtonType[keyof typeof ButtonType];

export const PickerType = {
  DATE: 'DATE',
  TIME: 'TIME',
} as const;

export type PickerTypeT = typeof PickerType[keyof typeof PickerType];

export const InputType = {
  PASSWORD: 'PASSWORD',
  TEXT: 'TEXT',
} as const;

export type InputTypeT = typeof InputType[keyof typeof InputType];

export const ModalType = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
  REMATCH: 'REMATCH',
  FIX: 'FIX',
} as const;

export type ShowModalType = typeof ModalType[keyof typeof ModalType];

export const Menu = {
  INFO: 'INFO',
  RECORD: 'RECORD',
  CALENDAR: 'CALENDAR',
  LIKED: 'LIKED',
} as const;

export type ProfileMenuType = typeof Menu[keyof typeof Menu];

export const SignupMenu = {
  INFO: 'INFO',
  MOREINFO: 'MOREINFO',
  GYMINFO: 'GYMINFO',
  FRIENDSINFO: 'FRIENDSINFO',
} as const;

export type SignupMenuType = typeof SignupMenu[keyof typeof SignupMenu];

export const Process = {
  PROCESS: 'PROCESS',
  WAIT: 'WAIT',
  FINISHED: 'FINISHED',
} as const;

export type ProcessType = typeof Process[keyof typeof Process];

export const SignupSteps = [
  { step: SignupMenu.INFO, title: 'STEP1', description: '회원 정보' },
  { step: SignupMenu.MOREINFO, title: 'STEP2', description: '추가 정보' },
  { step: SignupMenu.GYMINFO, title: 'STEP3', description: '추가 정보' },
  {
    step: SignupMenu.FRIENDSINFO,
    title: 'STEP4',
    description: '매칭되고 싶은 친구 정보',
  },
] as const;

export type SignupStepsType = typeof SignupSteps[number];

export const AgeOptions = [
  { value: 1, text: '10대' },
  { value: 2, text: '20대' },
  { value: 3, text: '30대' },
  { value: 4, text: '40대' },
  { value: 5, text: '50대' },
  { value: 6, text: '60대' },
  { value: 7, text: '70대' },
  { value: 8, text: '80대' },
  { value: 9, text: '90대' },
  { value: 10, text: '90대 이상' },
] as const;

export type AgeOptionsType = typeof AgeOptions[number];

export const CareerOptions = [
  { value: 1, text: '1년 미만' },
  { value: 2, text: '1년 이상 ~ 3년 미만' },
  { value: 3, text: '3년 이상 ~ 5년 미만' },
  { value: 4, text: '5년 이상 ~ 10년 미만' },
  { value: 5, text: '10년 이상' },
] as const;

export type CareerOptionsType = typeof CareerOptions[number];

export const RoleOptions = [
  { value: 1, text: '도움을 주고 싶어요!' },
  { value: 2, text: '도움을 받고 싶어요!' },
  { value: 3, text: '함께 운동하고 싶어요!' },
] as const;

export type RoleOptionsType = typeof RoleOptions[number];

export const GenderOptions = [
  { value: 'male', text: '남성' },
  { value: 'female', text: '여성' },
] as const;

export type GenderOptionsType = typeof GenderOptions[number];

export const SearchGymTabs = [
  { value: 'search', text: '헬스장 찾기' },
  { value: 'add', text: '헬스장 등록' },
] as const;

export type SearchGymTabsType = typeof SearchGymTabs[number];

export const ModalStatus = {
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  SUCCESS: 'SUCCESS',
  PRIMARY: 'PRIMARY',
} as const;

export type ModalStatusType = typeof ModalStatus[keyof typeof ModalStatus];

export const GlobalModal = {
  ALERT: 'ALERT',
} as const;

export type GlobalModalType = typeof GlobalModal[keyof typeof GlobalModal];

export const detailActions = (onRefuse: () => void, onAccept: () => void) =>
  [
    { id: 'refuse', title: '거절', onClick: onRefuse },
    {
      id: 'accept',
      title: '수락',
      type: ButtonType.SIGNATURE,
      onClick: onAccept,
    },
  ] as const;

export const reqCancelActions = (onRequest: () => void) =>
  [
    {
      id: 'cancel',
      title: '취소요청',
      type: ButtonType.ERROR,
      onClick: onRequest,
    },
  ] as const;

export const waitCancelActions = (onCancel: () => void) =>
  [
    {
      id: 'cancel',
      title: '취소응답 대기중',
      type: ButtonType.ERROR,
      onClick: onCancel,
    },
  ] as const;

export const resCancelActions = (onResponse: () => void) =>
  [
    {
      id: 'cancelcheck',
      title: '취소요청 승인',
      type: ButtonType.ERROR,
      onClick: onResponse,
    },
  ] as const;

export const MatchingActionType = {
  DEFAULT: 'DEFAULT',
  DETAIL: 'DETAIL',
  REQ_CANCEL: 'REQ_CANCEL',
  RES_CANCEL: 'RES_CANCEL',
} as const;

export const loginedUserProfile = (
  icon: ReactNode[],
  onClickAction: ({ key, id }: any) => void,
  compareToday: number
) =>
  [
    {
      icon: icon[0],
      key: ModalType.FIX,
      onClick: onClickAction,
    },
    {
      icon: icon[1],
      key: ModalType.REMATCH,
      onClick: onClickAction,
    },
    {
      icon: icon[2],
      key: ModalType.EDIT,
      onClick: onClickAction,
      disabled: compareToday < 0,
    },
  ] as const;

export const StateFilter = [
  { value: 'before', text: '매칭수락 후' },
  { value: 'after', text: '매칭수락 전' },
] as const;

export const PeriodFilter = [
  { value: 'scheduled', text: '예정된매칭' },
  { value: 'last', text: '지난매칭' },
] as const;

export const TypeFilter = [
  { value: 'request', text: '보낸매칭' },
  { value: 'receive', text: '받은매칭' },
] as const;

// export type SearchGymTabsType = typeof SearchGymTabs[number];

export const InfoContent = {
  MORE: 'MORE',
  FRIENDS: 'FRIENDS',
} as const;

export type InfoContentType = typeof InfoContent[keyof typeof InfoContent];
