import axios from 'axios';
import { backUrl } from '@/../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const loadMyinfoAPI = () => {
  try {
    return axios.get('/user/profile/myinfo').then((response) => response.data);
  } catch (error: unknown) {
    console.log(error);
  }
};

export const loadProfileAPI = (id?: string | string[]) => {
  try {
    return axios.get(`/user/profile/${id}`).then((response) => response.data);
  } catch (error: unknown) {
    console.log(error);
  }
};

export const loadLikedListAPI = (userId: string) => {
  try {
    return axios.get(`/user/like${userId}`).then((response) => response.data);
  } catch (error: unknown) {
    console.log(error);
  }
};

export const uploadImageAPI = (data: FormData) => {
  try {
    return axios.post('/user/image', data).then((response) => response.data);
  } catch (error: unknown) {
    console.log(error);
    throw new Error('axios error');
  }
};

export const addImageAPI = (data: string) => {
  try {
    return axios
      .post('/user/profileimage', { image: data })
      .then((response) => response.data);
  } catch (error: unknown) {
    console.log(error);
    throw new Error('axios error');
  }
};
