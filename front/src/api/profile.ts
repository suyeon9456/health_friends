import axios from 'axios';
import { backUrl } from '@/../config/config';
import { FetchProfile } from '@/../@types/user';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const loadMyinfoAPI = () => {
  try {
    return axios
      .get('/user/profile/myinfo')
      .then(({ data }: { data: FetchProfile }) => {
        const { matching, myinfo } = data;
        const matchingTotalCount = matching?.[0]?.matchingCount || 0;
        const matchingRecount = matching?.[0]?.rematchingCount || 0;
        return {
          ...myinfo,
          Liked: myinfo?.Liked?.map(({ id }) => id),
          matchingTotalCount,
          matchingRecount,
          mathcing: matching?.map(
            ({ FriendId }: { FriendId: number }) => FriendId
          ),
        };
      });
  } catch (error: unknown) {
    console.log(error);
  }
};

export const loadProfileAPI = (id?: string | string[]) => {
  try {
    return axios
      .get(`/user/profile/${id}`)
      .then(({ data }: { data: FetchProfile }) => {
        const { matching, user } = data;
        const matchingTotalCount = matching?.[0]?.matchingCount || 0;
        const matchingRecount = matching?.[0]?.rematchingCount || 0;
        return {
          ...user,
          Liked: user?.Liked?.map(({ id: likedId }) => likedId),
          matchingTotalCount,
          matchingRecount,
          mathcing: matching?.map(
            ({ FriendId }: { FriendId: number }) => FriendId
          ),
        };
      });
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
