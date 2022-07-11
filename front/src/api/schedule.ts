import axios from 'axios';
import { backUrl } from '@/../config/config';
import {
  RecordScheduleAPI,
  Schedule,
  ScheduleModel,
  UpdateCancelAPI,
} from '@/../@types/schedule';
import isEmpty from 'lodash/isEmpty';
import { formatDate } from '@/../@utils/date';
import { stringOrDate } from 'react-big-calendar';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const loadSchedulesAPI = ({
  isProfile,
  profileId,
  limit,
  status,
  term,
  type,
  isCanceled,
}: {
  isProfile?: boolean;
  profileId?: number;
  limit: number;
  status: string[];
  term: string[];
  type: string[];
  isCanceled: boolean;
}) => {
  try {
    const userId = isProfile ? `userId=${profileId}&` : '';
    const fs = !isEmpty(status) && `&fs=${status.map((m) => `${m}`).join(',')}`;
    const fp = !isEmpty(term) && `&fp=${term.map((m) => `${m}`).join(',')}`;
    const ft = !isEmpty(type) && `&ft=${type.map((m) => `${m}`).join(',')}`;
    const cancel = isCanceled ? '&isCanceled=true' : '';
    return axios
      .get(
        `/schedules?${userId}limit=${limit}${cancel}${fp || ''}${ft || ''}${
          fs || ''
        }`
      )
      .then(
        ({
          data,
        }: {
          data: {
            nextCursor: number;
            schedules: RecordScheduleAPI[];
          };
        }) =>
          data.schedules.map((schedule) => ({
            ...schedule,
            start: new Date(schedule?.startDate),
            end: new Date(schedule?.endDate),
            nextCursor: data.nextCursor,
          }))
      );
  } catch (error: unknown) {
    console.log(error);
  }
};

export const loadScheduleAPI = (
  matchingId: number | null,
  queryId?: string | string[],
  profileId?: number
) => {
  try {
    return axios
      .get(`/schedule/${matchingId}${queryId ? `?userId=${profileId}` : ''}`)
      .then((response) => response.data);
  } catch (error: unknown) {
    console.log(error);
  }
};

export const loadCalendarScheduleAPI = ({
  range,
  profileId,
}: {
  range: {
    start: stringOrDate;
    end: stringOrDate;
  };
  profileId?: number | null;
}) => {
  try {
    const { start, end } = range;
    const userId = profileId ? `userId=${profileId}&` : '';
    return axios
      .get(
        `/schedules/calendar?${userId}start=${formatDate(
          start
        )}&end=${formatDate(end)}`
      )
      .then((response) => response.data);
  } catch (error: unknown) {
    console.log(error);
  }
};

export const addScheduleAPI = (data: Schedule) => {
  try {
    return axios.post('/schedule', data).then((response) => response.data);
  } catch (error: unknown) {
    console.log(error);
    throw new Error('axios error');
  }
};

export const addReScheduleAPI = (data: Schedule) => {
  try {
    return axios.post('/schedule/re', data).then((response) => response.data);
  } catch (error: unknown) {
    console.log(error);
    throw new Error('axios error');
  }
};

export const addCancelAPI = (data: { id?: number }) => {
  try {
    return axios
      .post('/schedule/cancel', data)
      .then((response) => response.data);
  } catch (error: unknown) {
    console.log(error);
    throw new Error('axios error');
  }
};

export const updateScheduleAPI = (data: ScheduleModel) => {
  try {
    return axios.put('/schedule', data).then((response) => response.data);
  } catch (error: unknown) {
    console.log(error);
    throw new Error('axios error');
  }
};

export const updatePermissionAPI = (data: {
  scheduleId?: number;
  permission: boolean;
  friendId?: number;
}) => {
  try {
    return axios
      .put('/schedule/permission', data)
      .then((response) => response.data);
  } catch (error: unknown) {
    console.log(error);
    throw new Error('axios error');
  }
};

export const updateCancelAPI = (data: UpdateCancelAPI) => {
  try {
    return axios
      .put('/schedule/cancel', data)
      .then((response) => response.data);
  } catch (error: unknown) {
    console.log(error);
    throw new Error('axios error');
  }
};

export const updateFixAPI = (data: number) => {
  try {
    return axios.put(`/schedule/${data}/fix`).then((response) => response.data);
  } catch (error: unknown) {
    console.log(error);
    throw new Error('axios error');
  }
};
