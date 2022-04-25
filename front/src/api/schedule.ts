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
  profileId: number;
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
    );
};

export const loadScheduleAPI = (
  matchingId: number | null,
  queryId?: string | string[],
  profileId?: number
) => {
  return axios
    .get(`/schedule/${matchingId}${queryId ? `?userId=${profileId}` : ''}`)
    .then((response) => response.data);
};

export const loadCalendarScheduleAPI = ({
  range,
  profileId,
}: {
  range: {
    start: stringOrDate;
    end: stringOrDate;
  };
  profileId: number | null;
}) => {
  const { start, end } = range;
  const userId = profileId ? `userId=${profileId}&` : '';
  return axios
    .get(
      `/schedules/calendar?${userId}start=${formatDate(start)}&end=${formatDate(
        end
      )}`
    )
    .then((response) => response.data);
};

export const addScheduleAPI = (data: Schedule) => {
  return axios.post('/schedule', data).then((response) => response.data);
};

export const addReScheduleAPI = (data: Schedule) => {
  return axios.post('/schedule/re', data).then((response) => response.data);
};

export const addCancelAPI = (data: { id?: number }) => {
  return axios.post('/schedule/cancel', data).then((response) => response.data);
};

export const updateScheduleAPI = (data: ScheduleModel) => {
  return axios.put('/schedule', data).then((response) => response.data);
};

export const updatePermissionAPI = (data: {
  scheduleId?: number;
  permission: boolean;
  friendId?: number;
}) => {
  return axios
    .put('/schedule/permission', data)
    .then((response) => response.data);
};

export const updateCancelAPI = (data: UpdateCancelAPI) => {
  return axios.put('/schedule/cancel', data).then((response) => response.data);
};
