import axios from 'axios';
import { backUrl } from '@/../config/config';
import { AddressAPI, Location } from '@/../@types/gym';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const loadGymsAPI = ({
  lastId,
  searchWord,
  mapBounds,
}: {
  lastId?: number;
  searchWord?: string;
  mapBounds: Location | null;
}) => {
  try {
    if (!mapBounds) {
      return axios
        .get(
          `/gyms?lastId=${lastId ?? 0}&searchWord=${encodeURIComponent(
            searchWord ?? ''
          )}`
        )
        .then((response) => response.data);
    }
    const { swLon, swLat, neLon, neLat } = mapBounds;
    return axios
      .get(
        `/gyms?lastId=${lastId ?? 0}&searchWord=${encodeURIComponent(
          searchWord ?? ''
        )}&swLon=${swLon}&swLat=${swLat}&neLon=${neLon}&neLat=${neLat}`
      )
      .then((response) => response.data);
  } catch (error) {
    console.error(error);
    throw new Error('axios error');
  }
};

export const addGymAPI = (data: AddressAPI) => {
  try {
    return axios.post('/gym', data).then((response) => response.data);
  } catch (error) {
    console.error(error);
    throw new Error('axios error');
  }
};
