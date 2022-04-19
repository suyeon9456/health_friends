import { Dispatch, SetStateAction } from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';
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
  swLon?: string;
  swLat?: string;
  neLon?: string;
  neLat?: string;
}

export type Gyms = Gym[];

export interface CreateGym {
  control: Control<
    {
      address: string;
      addressRoad: string;
      phone: string;
      latitude: string;
      longitude: string;
      name: string;
    },
    object
  >;
  setValue: UseFormSetValue<{
    address: string;
    addressRoad: string;
    phone: string;
    latitude: string;
    longitude: string;
    name: string;
  }>;
}

export interface SearchGymProps {
  setShowModal: (state: boolean) => void;
  setGym: UseFormSetValue<{
    startTime: Date;
    endTime: Date;
    gym: string;
    description: string;
  }>;
}

export interface SearchGymsFoldedStatesProps {
  foldedFriends: boolean;
  setFoldedFriends: Dispatch<SetStateAction<boolean>>;
  foldedGym: boolean;
  setFoldedGym: Dispatch<SetStateAction<boolean>>;
}

export interface CreateGymForm {
  address: string;
  addressRoad: string;
  phone: string;
  latitude: string;
  longitude: string;
  name: string;
}

export interface CreateGymProps {
  title: string;
  onCancel: () => void;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setGym: UseFormSetValue<{
    startTime: Date;
    endTime: Date;
    gym: string;
    description: string;
  }>;
}
