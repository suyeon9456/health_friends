import produce from 'immer';
import {
  ADD_PROFILEIMAGE_ERROR,
  ADD_PROFILEIMAGE_REQUEST,
  ADD_PROFILEIMAGE_SUCCESS,
  LOAD_PROFILE_INFO_ERROR,
  LOAD_PROFILE_INFO_REQUEST,
  LOAD_PROFILE_INFO_SUCCESS,
  LOAD_PROFILE_MYINFO_ERROR,
  LOAD_PROFILE_MYINFO_REQUEST,
  LOAD_PROFILE_MYINFO_SUCCESS,
  REMOVE_PROFILEIMAGE,
  UPDATE_MY_DESCRIPTION_ERROR,
  UPDATE_MY_DESCRIPTION_REQUEST,
  UPDATE_MY_DESCRIPTION_SUCCESS,
  UPDATE_MY_FRIENDS_INFO_ERROR,
  UPDATE_MY_FRIENDS_INFO_REQUEST,
  UPDATE_MY_FRIENDS_INFO_SUCCESS,
  UPDATE_MY_INFO_ERROR,
  UPDATE_MY_INFO_REQUEST,
  UPDATE_MY_INFO_SUCCESS,
  UPDATE_MY_NICKNAME_ERROR,
  UPDATE_MY_NICKNAME_REQUEST,
  UPDATE_MY_NICKNAME_SUCCESS,
  UPLOAD_PROFILEIMAGE_ERROR,
  UPLOAD_PROFILEIMAGE_REQUEST,
  UPLOAD_PROFILEIMAGE_SUCCESS
} from '../@types/utils';
import { ProfileInitialState } from "../@types/reducer/state";
import { ProfileActions } from '../@types/action';

const initialState: ProfileInitialState = {
  loadProfileInfoLoading: false,
  loadProfileInfoDone: false,
  loadProfileInfoError: null,
  loadProfileMyinfoLoading: false,
  loadProfileMyinfoDone: false,
  loadProfileMyinfoError: null,
  updateMyInfoLoading: false,
  updateMyInfoDone: false,
  updateMyInfoError: null,
  updateMyFriendsInfoLoading: false,
  updateMyFriendsInfoDone: false,
  updateMyFriendsInfoError: null,
  updateMyNicknameLoading: false,
  updateMyNicknameDone: false,
  updateMyNicknameError: null,
  updateMyDescriptionLoading: false,
  updateMyDescriptionDone: false,
  updateMyDescriptionError: null,
  uploadProfileImageLoading: false,
  uploadProfileImageDone: false,
  uploadProfileImageError: null,
  addProfileImageLoading: false,
  addProfileImageDone: false,
  addProfileImageError: null,
  profile: null,
  imagePath: null,
};

const reducer = (state = initialState, action: ProfileActions) => (produce(state, (draft) => {
  switch (action.type) {
    case LOAD_PROFILE_INFO_REQUEST:
      draft.loadProfileInfoLoading = true;
      draft.loadProfileInfoDone = false;
      draft.loadProfileInfoError = null;
      break;
    case LOAD_PROFILE_INFO_SUCCESS:
      draft.loadProfileInfoLoading = false;
      draft.loadProfileInfoDone = true;
      draft.profile = action.data;
      break;
    case LOAD_PROFILE_INFO_ERROR:
      draft.loadProfileInfoError = action.error;
      draft.loadProfileInfoLoading = false;
      break;
    case LOAD_PROFILE_MYINFO_REQUEST:
      draft.loadProfileMyinfoLoading = true;
      draft.loadProfileMyinfoDone = false;
      draft.loadProfileMyinfoError = null;
      break;
    case LOAD_PROFILE_MYINFO_SUCCESS:
      draft.loadProfileMyinfoLoading = false;
      draft.loadProfileMyinfoDone = true;
      draft.profile = { ...action.data, Liked: action.data.Liked.map(({ id }: { id: number }) => id) };
      break;
    case LOAD_PROFILE_MYINFO_ERROR:
      draft.loadProfileMyinfoError = action.error;
      draft.loadProfileMyinfoLoading = false;
      break;
  case UPDATE_MY_INFO_REQUEST:
    draft.updateMyInfoLoading = true;
    draft.updateMyInfoDone = false;
    draft.updateMyInfoError = null;
    break;
  case UPDATE_MY_INFO_SUCCESS:
    draft.updateMyInfoLoading = false;
    draft.updateMyInfoDone = true;
    draft.updateMyInfoError = null;
    draft.profile = action.data;
    break;
  case UPDATE_MY_INFO_ERROR:
    draft.updateMyInfoLoading = false;
    draft.updateMyInfoError = action.error;
    break;
  case UPDATE_MY_FRIENDS_INFO_REQUEST:
    draft.updateMyFriendsInfoLoading = true;
    draft.updateMyFriendsInfoDone = false;
    draft.updateMyFriendsInfoError = null;
    break;
  case UPDATE_MY_FRIENDS_INFO_SUCCESS:
    draft.updateMyFriendsInfoLoading = false;
    draft.updateMyFriendsInfoDone = true;
    draft.updateMyFriendsInfoError = null;
    draft.profile = action.data;
    // draft.me = action.data;
    break;
  case UPDATE_MY_FRIENDS_INFO_ERROR:
    draft.updateMyFriendsInfoLoading = false;
    draft.updateMyFriendsInfoError = action.error;
    break;
  case UPDATE_MY_NICKNAME_REQUEST:
    draft.updateMyNicknameLoading = true;
    draft.updateMyNicknameDone = false;
    draft.updateMyNicknameError = null;
    break;
  case UPDATE_MY_NICKNAME_SUCCESS:
    draft.updateMyNicknameLoading = false;
    draft.updateMyNicknameDone = true;
    draft.updateMyNicknameError = null;
    draft.me.nickname = action.data.nickname;
    draft.profile.nickname = action.data.nickname;
    break;
  case UPDATE_MY_NICKNAME_ERROR:
    draft.updateMyNicknameLoading = false;
    draft.updateMyNicknameError = action.error;
    break;
  case UPDATE_MY_DESCRIPTION_REQUEST:
    draft.updateMyDescriptionLoading = true;
    draft.updateMyDescriptionDone = false;
    draft.updateMyDescriptionError = null;
    break;
  case UPDATE_MY_DESCRIPTION_SUCCESS:
    draft.updateMyDescriptionLoading = false;
    draft.updateMyDescriptionDone = true;
    draft.updateMyDescriptionError = null;
    draft.me.description = action.data.description;
    draft.profile.Userdetail.description = action.data.description;
    break;
  case UPDATE_MY_DESCRIPTION_ERROR:
    draft.updateMyDescriptionLoading = false;
    draft.updateMyDescriptionError = action.error;
    break;
  case UPLOAD_PROFILEIMAGE_REQUEST:
    draft.uploadProfileImageLoading = true;
    draft.uploadProfileImageDone = false;
    draft.uploadProfileImageError = null;
    break;
  case UPLOAD_PROFILEIMAGE_SUCCESS:
    draft.uploadProfileImageLoading = false;
    draft.uploadProfileImageDone = true;
    draft.uploadProfileImageError = null;
    draft.imagePath = action.data;
    break;
  case UPLOAD_PROFILEIMAGE_ERROR:
    draft.uploadProfileImageLoading = false;
    draft.uploadProfileImageError = action.error;
    break;
  case ADD_PROFILEIMAGE_REQUEST:
    draft.addProfileImageLoading = true;
    draft.addProfileImageDone = false;
    draft.addProfileImageError = null;
    break;
  case ADD_PROFILEIMAGE_SUCCESS:
    draft.addProfileImageLoading = false;
    draft.addProfileImageDone = true;
    draft.addProfileImageError = null;
    draft.profile = action.data;
    draft.imagePath = null;
    break;
  case ADD_PROFILEIMAGE_ERROR:
    draft.addProfileImageLoading = false;
    draft.addProfileImageError = action.error;
    break;
  case REMOVE_PROFILEIMAGE:
    draft.imagePath = null;
    break;
  default:
    break;
  }
}));

export default reducer;
