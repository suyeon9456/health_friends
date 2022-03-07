declare module 'calendar' {
  export interface CalendarEvent {
    Cancel?: {
      RequestId: number;
      ResponseId: number;
      ScheduleId: number;
      createdAt: string;
      id: number;
      isCanceled: boolean;
      updatedAt: string;
    };
    Receiver: { id: number; nickname: string; Image: object };
    Gym: { address: string; name: string };
    Requester: { id: number; nickname: string; Image: object };
    address: string;
    description: string
    end: Date;
    endDate: string;
    gymName?: string;
    id: number;
    isPermitted: boolean;
    nickname: string;
    permission: boolean;
    start: Date;
    startDate: string;
  }
  export type CalendarEvents = Array<CalendarEvent>
}
