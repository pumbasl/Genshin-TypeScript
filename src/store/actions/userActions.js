import { createAction } from '@reduxjs/toolkit';

import {
    SET_PROMOCODES,
    SET_USER_PROMOCODES,
    SET_SERVER,
    SET_WEBEVENTS,
    SET_TOKEN,
    SET_ERRORS,
    SET_USER_INFO,
    SET_NEWS,
    SET_LOADING
} from '../types/types';
  
export const setNews = createAction(SET_NEWS, prepare);
export const setUserInfo = createAction(SET_USER_INFO, prepare);
export const setErrors = createAction(SET_ERRORS, prepare);
export const setToken = createAction(SET_TOKEN, prepare);
export const setWebEvents = createAction(SET_WEBEVENTS, prepare);
export const setPromoCodes = createAction(SET_PROMOCODES, prepare);
export const setUserPromoCodes = createAction(SET_USER_PROMOCODES, prepare);
export const setServer = createAction(SET_SERVER, prepare);
export const setLoading = createAction(SET_LOADING, prepare);

function prepare(a) {
    return {
        payload: a
    };
}