import { createReducer } from '@reduxjs/toolkit';

import {
    SET_THREADS,
    SET_THREAD
} from '../types/types';
    
import { initialStateThreads as initialState } from '../initialState';

const threadReducer = createReducer(initialState, (threadReducer) => {
  threadReducer
    .addCase(SET_THREADS, (state, action) => {
        state.threads = action.payload;
    })

    .addCase(SET_THREAD, (state, action) => {
        state.thread = action.payload;
    })

    .addDefaultCase((state, action) => {
      return state;
    })
});

export default threadReducer;