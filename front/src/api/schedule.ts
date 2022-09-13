import axios, { AxiosResponse } from 'axios';
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

const responseBody = (res: AxiosResponse) => res.data;

const api = {
  get: async <R>(url: string, params?: object | null): Promise<R> => {
    const result = await axios
      .get(url, params as object)
      .then(responseBody)
      .catch(() => {
        throw new Error('axios error');
      });
    return result;
  },
  post: async <B, R>(url: string, body: B): Promise<R> => {
    const result = await axios
      .post(url, body)
      .then(responseBody)
      .catch(() => {
        throw new Error('axios error');
      });
    return result;
  },
  put: async <B, R>(url: string, body?: B): Promise<R> => {
    const result = await axios
      .put(url, body)
      .then(responseBody)
      .catch(() => {
        throw new Error('axios error');
      });
    return result;
  },
};

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
    )
    .catch(() => {
      throw new Error('axios error');
    });
};

export const loadScheduleAPI = (
  matchingId: number | null,
  queryId?: string | string[],
  profileId?: number
) => {
  return api.get(
    `/schedule/${matchingId}${queryId ? `?userId=${profileId}` : ''}`
  );
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
  const { start, end } = range;
  const userId = profileId ? `userId=${profileId}&` : '';
  return api.get(
    `/schedules/calendar?${userId}start=${formatDate(start)}&end=${formatDate(
      end
    )}`
  );
};

export const addScheduleAPI = (data: Schedule) => {
  return api.post('/schedule', data);
};

export const addReScheduleAPI = (data: Schedule) => {
  return api.post('/schedule/re', data);
};

export const addCancelAPI = (data: { id?: number }) => {
  return api.post('/schedule/cancel', data);
};

export const updateScheduleAPI = (data: ScheduleModel) => {
  return api.put('/schedule', data);
};

export const updatePermissionAPI = (data: {
  scheduleId?: number;
  permission: boolean;
  friendId?: number;
}) => {
  return api.put('/schedule/permission', data);
};

export const updateCancelAPI = (data: UpdateCancelAPI) => {
  return api.put('/schedule/cancel', data);
};

export const updateFixAPI = (data: number) => {
  return api.put(`/schedule/${data}/fix`);
};
