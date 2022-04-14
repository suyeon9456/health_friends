import { User, UserGym } from './user';

export interface Gym {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  addressRoad: string;
  phone: string;
  Users?: UserGym[];
}

export interface Address {
  id?: number;
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
