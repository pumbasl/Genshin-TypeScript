import { combineReducers } from '@reduxjs/toolkit';
import adminSlice from './adminSlice';
// import alertSlice from './alertSlice';
import userSlice from './userSlice';
import webEventsSlice from './webEventsSlice';

export const rootReducer = combineReducers({
    user: userSlice,
    webEvents: webEventsSlice,
    admin: adminSlice,
    // alerts: alertSlice
});