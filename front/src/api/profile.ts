import axios from 'axios';
import { backUrl } from '@/../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const loadMyinfoAPI = () => {
  return axios.get('/user/profile/myinfo').then((response) => response.data);
};

export const loadProfileAPI = (id?: string | string[]) => {
  return axios.get(`/user/profile/${id}`).then((response) => response.data);
};

export const loadLikedListAPI = (userId: string) => {
  return axios.get(`/user/like${userId}`).then((response) => response.data);
};

export const uploadImageAPI = (data: FormData) => {
  return axios.post('/user/image', data).then((response) => response.data);
};

export const addImageAPI = (data: string) => {
  console.log(data);
  return axios
    .post('/user/profileimage', { image: data })
    .then((response) => response.data);
};
