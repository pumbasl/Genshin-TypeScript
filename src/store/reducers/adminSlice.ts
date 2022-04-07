import { createSlice } from '@reduxjs/toolkit';

export interface IAdminState {
    users: string[];
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