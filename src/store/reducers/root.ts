import { combineReducers } from '@reduxjs/toolkit';
import adminSlice from './adminSlice';
import userSlice from './userSlice';

export const rootReducer = combineReducers({
    user: userSlice,
    admin: adminSlice
});