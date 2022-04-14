import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import profile from './profile';
import gym from './gym';

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE:
      // console.log('HYDRATE', HYDRATE);
      // console.log('payload', action.payload);
      return action.payload;
    default: {
      const combineReducer = combineReducers({ user, profile, gym });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
