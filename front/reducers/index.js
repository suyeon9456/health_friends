import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import gym from './gym';
import schedule from './schedule';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', HYDRATE);
      // console.log('payload', action.payload);
      return action.payload;
    default: {
      const combineReducer = combineReducers({ user, gym, schedule });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
