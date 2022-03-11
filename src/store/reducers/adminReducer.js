import { createReducer } from '@reduxjs/toolkit';

import {
  SET_ADMIN_USERS
} from '../types/types';
    
import { initialStateAdmin as initialState } from '../initialState';

const adminReducer = createReducer(initialState, (adminReducer) => {
  adminReducer
    .addCase(SET_ADMIN_USERS, (state, action) => {
      state.users = action.payload;
    })

    .addDefaultCase((state, action) => {
      return state;
    })
});

export default adminReducer;