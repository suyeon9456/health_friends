import axios from 'axios';
import { backUrl } from '@/../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const uploadImageAPI = (data: FormData) => {
  return axios.post('/user/image', data).then((response) => response.data);
};

export const addImageAPI = (data: string) => {
  console.log(data);
  return axios
    .post('/user/profileimage', { image: data })
    .then((response) => response.data);
};
