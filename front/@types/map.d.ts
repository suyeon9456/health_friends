import { Dispatch, SetStateAction } from 'react';

export interface Location {
  regionSiName: string | null;
  regionGuName: string | null;
  regionDongName: string | null;
  mainAddressNo: string | null;
}

export interface KeywordPlace {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  marker: object;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export interface SearchMapProps {
  foldedFriends: boolean;
  setFoldedFriends: Dispatch<SetStateAction<boolean>>;
}
