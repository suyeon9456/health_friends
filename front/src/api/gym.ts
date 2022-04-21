import axios from 'axios';
import { backUrl } from '@/../config/config';
import { AddressAPIProps } from '@/../@types/gym';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

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

export const addGymAPI = (data: AddressAPIProps) => {
  return axios.post('/gym', data).then((response) => response.data);
};
