import axios, { AxiosResponse } from 'axios';
import { backUrl } from '@/../config/config';
import { FetchProfile } from '@/../@types/user';

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
};

export const loadMyinfoAPI = () => {
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
    })
    .catch(() => {
      throw new Error('axios error');
    });
};

export const loadProfileAPI = (id?: string | string[]) => {
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
    })
    .catch(() => {
      throw new Error('axios error');
    });
};

export const loadLikedListAPI = (userId: string) => {
  return api.get(`/user/like${userId}`);
};

export const uploadImageAPI = (data: FormData) => {
  return api.post('/user/image', data);
};

export const addImageAPI = (data: string) => {
  return api.post('/user/profileimage', { image: data });
};
