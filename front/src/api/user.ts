import axios, { AxiosResponse } from 'axios';
import { backUrl } from '@/../config/config';

import groupBy from 'lodash/groupBy';
import forIn from 'lodash/forIn';
import orderBy from 'lodash/orderBy';

import { MatchingAPI } from '@/../@types/schedule';
import { Location } from '@/../@types/map';
import {
  RankedFriendsAPI,
  SignupFriendsInfo,
  SignupGymInfo,
  SignupInfo,
  SignupMoreInfo,
} from '@/../@types/user';
import { Gym } from '@/../@types/gym';

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
  post: async <B, R>(url: string, body?: B): Promise<R> => {
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
  patch: async <B, R>(url: string, body?: B): Promise<R> => {
    const result = await axios
      .patch(url, body)
      .then(responseBody)
      .catch(() => {
        throw new Error('axios error');
      });
    return result;
  },
  delete: async <R>(url: string): Promise<R> => {
    const result = await axios
      .patch(url)
      .then(responseBody)
      .catch(() => {
        throw new Error('axios error');
      });
    return result;
  },
};

export const loadLoginedUserAPI = () => api.get(`/user`);

export const loadRankingAPI = () => {
  return axios
    .get(`/users/ranked`)
    .then(({ data }: { data: RankedFriendsAPI }) => {
      const idGroup = groupBy(data.matching, 'id');
      const matching: MatchingAPI[] = [];
      forIn(idGroup, (value) => {
        if (value.length > 1) {
          const req = {
            ...value[0],
            count: value[0].reqSchedule.length + value[1].resSchedule.length,
          };
          return matching.push(req);
        }
        return matching.push({
          ...value[0],
          count:
            value[0].reqSchedule?.length ||
            0 + value[0].resSchedule?.length ||
            0,
        });
      });
      return {
        rematching: data.rematching,
        matching: orderBy(matching, ['count'], ['desc']),
      };
    })
    .catch(() => {
      throw new Error('axios error');
    });
};

export const loadRealtimeAPI = () => api.get('/schedules/realtime');

export const loadRecommendAPI = (location?: Location | null) => {
  const { regionSiName, regionGuName, regionDongName, mainAddressNo } =
    location ?? {
      regionSiName: '',
      regionGuName: '',
      regionDongName: '',
      mainAddressNo: '',
    };
  return api.get(
    `/users/recommend?si=${regionSiName}&gu=${regionGuName}&dong=${regionDongName}&mainAddressNo=${mainAddressNo}`
  );
};

export const loadSignupGymsAPI = (searchWord?: string) => {
  return api.get(`/gyms?searchWord=${encodeURIComponent(searchWord ?? '')}`);
};

export const loadGymAndFriendsAPI = ({
  gymId,
  lastId,
}: {
  gymId: number;
  lastId?: number;
}) => {
  if (gymId === 0) {
    return;
  }
  return axios
    .get(`/gym/${gymId}?lastId=${lastId ?? 0}`)
    .then(({ data }: { data: Gym }) => {
      const { Users } = data;
      return {
        ...data,
        Users: Users?.map((user) => {
          return {
            ...user,
            totalCount: user?.reqSchedule?.length + user?.resSchedule?.length,
            rematchCount:
              user?.reqSchedule?.filter(
                (req) => !!req.permission && !!req.RematchId
              )?.length +
              user?.resSchedule?.filter(
                (res) => !!res.permission && !!res.RematchId
              )?.length,
          };
        }),
      };
    })
    .catch(() => {
      throw new Error('axios error');
    });
};

export const signupAPI = (data: {
  info: SignupInfo;
  moreInfo: SignupMoreInfo;
  gymInfo: SignupGymInfo;
  selectedGym: {};
  friendsInfo: SignupFriendsInfo;
}) => api.post('/user', data);

export const loginAPI = (data: { email: string; password: string }) => {
  return api.post('/user/login', data);
};

export const logoutAPI = () => api.post(`/user/logout`);

export const addLikeAPI = (data: number) => api.post(`/user/${data}/like`);

export const updateMyinfoAPI = (data: SignupMoreInfo & SignupGymInfo) => {
  return api.put('/user', data);
};

export const updateFriendsInfoAPI = (data: SignupMoreInfo & SignupGymInfo) => {
  return api.put('/user/detail', data);
};

export const updateNicknameAPI = (data: { nickname: string }) => {
  return api.patch('/user/nickname', data);
};

export const updateDescriptionAPI = (data: { description: string }) => {
  return api.patch('/user/description', data);
};

export const updateUserGymAPI = (data: number) => {
  return api.put('/user/gym', { gymId: data });
};

export const unLikeAPI = (data: number) => {
  return api.put('/user/unlike', { id: data });
};

export const secedeAPI = () => {
  return api.delete('/user');
};
