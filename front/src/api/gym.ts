import axios, { AxiosResponse } from 'axios';
import { backUrl } from '@/../config/config';
import { AddressAPI, Location } from '@/../@types/gym';

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

export const loadGymsAPI = ({
  lastId,
  searchWord,
  mapBounds,
}: {
  lastId?: number;
  searchWord?: string;
  mapBounds: Location | null;
}) => {
  if (!mapBounds) {
    return api.get(
      `/gyms?lastId=${lastId ?? 0}&searchWord=${encodeURIComponent(
        searchWord ?? ''
      )}`
    );
  }
  const { swLon, swLat, neLon, neLat } = mapBounds;
  return api.get(
    `/gyms?lastId=${lastId ?? 0}&searchWord=${encodeURIComponent(
      searchWord ?? ''
    )}&swLon=${swLon}&swLat=${swLat}&neLon=${neLon}&neLat=${neLat}`
  );
};

export const addGymAPI = (data: AddressAPI) => {
  return api.post<AddressAPI, any>('/gym', data);
};
