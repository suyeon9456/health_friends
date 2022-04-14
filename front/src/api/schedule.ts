import axios from 'axios';
import { backUrl } from '@/../config/config';
import { Schedule, ScheduleModel } from '@/../@types/schedule';
import { UpdateCancellationProps } from '@/../@types/action';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

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
  friendId: number;
}) => {
  return axios
    .put('/schedule/permission', data)
    .then((response) => response.data);
};

export const updateCancelAPI = (data: UpdateCancellationProps) => {
  return axios.put('/schedule/cancel', data).then((response) => response.data);
};
