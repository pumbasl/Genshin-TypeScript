import { createSlice } from '@reduxjs/toolkit';
import { IUserinfo } from '../../types';

export interface IAdminState {
    users: IUserinfo[];
};

const initialState: IAdminState = {
    users: []
};

export const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        setAdminUsers(state, action){
            state.users = action.payload;
        }
    }
});

export default adminSlice.reducer;