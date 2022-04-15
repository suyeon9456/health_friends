import axios from 'axios';
import { backUrl } from '@/../config/config';
import {
  RecordScheduleFetch,
  Schedule,
  ScheduleModel,
} from '@/../@types/schedule';
import { UpdateCancellationProps } from '@/../@types/action';
import isEmpty from 'lodash/isEmpty';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const loadSchedulesAPI = ({
  isProfile,
  profileId,
  limit,
  status,
  term,
  type,
  rejectedMatching,
}: {
  isProfile?: boolean;
  profileId: number;
  limit: number;
  status: string[];
  term: string[];
  type: string[];
  rejectedMatching: boolean;
}) => {
  const userId = isProfile ? `userId=${profileId}&` : '';
  const statusquery =
    !isEmpty(status) && `&${status.map((m) => `${m}=true`).join('&')}`;
  const termquery =
    !isEmpty(term) && `&${term.map((m) => `${m}=true`).join('&')}`;
  const typequery =
    !isEmpty(type) && `&${type.map((m) => `${m}=true`).join('&')}`;
  return axios
    .get(
      `/schedules?${userId}limit=${limit}&rejectedMatching=${rejectedMatching}${
        !termquery ? '' : termquery
      }${!typequery ? '' : typequery}${!statusquery ? '' : statusquery}`
    )
    .then(
      ({
        data,
      }: {
        data: {
          isLast: boolean;
          schedules: RecordScheduleFetch[];
        };
      }) => ({
        ...data,
        apiSchedules: data.schedules.map((schedule) => ({
          ...schedule,
          start: new Date(schedule?.startDate),
          end: new Date(schedule?.endDate),
        })),
      })
    );
};

export const loadScheduleAPI = (matchingId: number | null, userId: string) => {
  return axios
    .get(`/schedule/${matchingId}${userId}`)
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

export const updateCancelAPI = (data: UpdateCancellationProps) => {
  return axios.put('/schedule/cancel', data).then((response) => response.data);
};