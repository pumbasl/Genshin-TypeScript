import { createSlice } from '@reduxjs/toolkit';
import { IAlert } from '../../types';

export interface IAlertState {
    alerts: IAlert[];
    errors: string | null;
    isLoading: boolean;
};

const initialState: IAlertState = {
    alerts: [],
    errors: null,
    isLoading: false
};

export const alertSlice = createSlice({
    name: 'alertSlice',
    initialState,
    reducers: {
        fetchAlertsSucc(state, action){
            state.errors = null;
            state.isLoading = false;
            state.alerts = action.payload;
        },

        fetchAlertsError(state, action){
            state.errors = action.payload;
            state.isLoading = false;
        }
    }
});

export default alertSlice.reducer;