import { User } from './user';

export interface Gym {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  Users?: User[];
}

export interface Address {
  sido: string;
  sigungu: string;
  address: string;
  latitude: string;
  longitude: string;
  name: string;
}

export interface Location {
  swLon: string;
  swLat: string;
  neLon: string;
  neLat: string;
}

export type Gyms = Gym[];
