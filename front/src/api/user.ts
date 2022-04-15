import axios from 'axios';
import { backUrl } from '@/../config/config';

import groupBy from 'lodash/groupBy';
import forIn from 'lodash/forIn';
import orderBy from 'lodash/orderBy';

import { Matching, RecordScheduleFetch } from '@/../@types/schedule';
import { FetchRankedFriends } from '@/../@types/fetchData';
import { Location } from 'map';
import {
  SignupFriendsInfo,
  SignupGymInfo,
  SignupInfo,
  SignupMoreInfo,
} from '@/../@types/user';
import { Address, Gym } from '@/../@types/gym';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const loadMyinfoAPI = () => {
  return axios.get('/user/profile/myinfo').then((response) => response.data);
};

export const loadProfileAPI = (id?: string | string[]) => {
  return axios.get(`/user/profile/${id}`).then((response) => response.data);
};

export const loadLoginedUserAPI = () => {
  return axios.get(`/user`).then((response) => response.data);
};

export const loadRankedFriendsAPI = () => {
  return axios
    .get(`/users/rankedFriends`)
    .then(({ data }: { data: FetchRankedFriends }) => {
      const idGroup = groupBy(data.matching, 'id');
      const matching: Matching[] = [];
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
    });
};

export const loadRealTimeMatchingAPI = () => {
  return axios.get('/users/realtimeMathcing').then((response) => response.data);
};

export const loadRecommendFriendsAPI = (location: Location) => {
  const { regionSiName, regionGuName, regionDongName, mainAddressNo } =
    location;
  return axios
    .get(
      `/users/recommendFriends?si=${regionSiName}&gu=${regionGuName}&dong=${regionDongName}&mainAddressNo=${mainAddressNo}`
    )
    .then((response) => response.data);
};

export const loadLikedListAPI = (userId: string) => {
  return axios.get(`/user/like${userId}`).then((response) => response.data);
};

export const loadSignupGymsAPI = (searchWord?: string) => {
  return axios
    .get(`/gyms?searchWord=${encodeURIComponent(searchWord ?? '')}`)
    .then((response) => response.data);
};

export const loadGymsAPI = ({
  lastId,
  searchWord,
}: {
  lastId?: number;
  searchWord?: string;
}) => {
  return axios
    .get(
      `/gyms?lastId=${lastId ?? 0}&searchWord=${encodeURIComponent(
        searchWord ?? ''
      )}`
    )
    .then((response) => response.data);
};

export const loadMapAPI = ({
  lastId,
  searchWord,
  mapBounds,
}: {
  lastId?: number;
  searchWord?: string;
  mapBounds: {
    swLon: string;
    swLat: string;
    neLon: string;
    neLat: string;
  };
}) => {
  if (!mapBounds) return;
  const { swLon, swLat, neLon, neLat } = mapBounds;
  return axios
    .get(
      `/gyms?lastId=${lastId ?? 0}&searchWord=${encodeURIComponent(
        searchWord ?? ''
      )}&swLon=${swLon}&swLat=${swLat}&neLon=${neLon}&neLat=${neLat}`
    )
    .then((response) => response.data);
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
    });
};

export const signupAPI = (data: {
  info: SignupInfo;
  moreInfo: SignupMoreInfo;
  gymInfo: SignupGymInfo;
  selectedGym: {};
  friendsInfo: SignupFriendsInfo;
}) => {
  return axios.post('/user', data).then((response) => response.data);
};

export const loginAPI = (data: { email: string; password: string }) => {
  return axios.post('/user/login', data).then((response) => response.data);
};

export const logoutAPI = () => {
  return axios.post(`/user/logout`).then((response) => response.data);
};

export const addLikeAPI = (data: number) => {
  return axios.post(`/user/${data}/like`).then((response) => response.data);
};

export const addGymAPI = (data: Address) => {
  return axios.post('/gym', data).then((response) => response.data);
};

export const updateMyinfoAPI = (data: SignupMoreInfo & SignupGymInfo) => {
  return axios.put('/user', data).then((response) => response.data);
};

export const updateFriendsInfoAPI = (data: SignupMoreInfo & SignupGymInfo) => {
  return axios.put('/user/detail', data).then((response) => response.data);
};

export const updateNicknameAPI = (data: { nickname: string }) => {
  return axios.patch('/user/nickname', data).then((response) => response.data);
};

export const updateDescriptionAPI = (data: { description: string }) => {
  return axios
    .patch('/user/description', data)
    .then((response) => response.data);
};
