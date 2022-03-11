import { createAction } from '@reduxjs/toolkit';

import {
    SET_THREADS,
    SET_THREAD
} from '../types/types';
  
export const setThreads = createAction(SET_THREADS, prepare);
export const setThread = createAction(SET_THREAD, prepare);

function prepare(a) {
    return {
        payload: a
    };
}