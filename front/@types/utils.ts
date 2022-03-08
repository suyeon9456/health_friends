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
  FINISHED: 'FINISHED'
} as const;

export type ProcessType = typeof Process[keyof typeof Process];

export const SignupSteps = [
  { step: SignupMenu.INFO,
    title: 'STEP1',
    description: '회원 정보' },
  { step: SignupMenu.MOREINFO,
    title: 'STEP2',
    description: '추가 정보' },
  { step: SignupMenu.GYMINFO,
    title: 'STEP3',
    description: '추가 정보' },
  { step: SignupMenu.FRIENDSINFO,
    title: 'STEP4',
    description: '매칭되고 싶은 친구 정보' },
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
  { value: 'add', text: '헬스장 등록' }
] as const;

export type SearchGymTabsType = typeof SearchGymTabs[number];
