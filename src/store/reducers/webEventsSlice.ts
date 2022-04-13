import { createSlice } from "@reduxjs/toolkit";
import { IWebEvents } from '../../types';

export interface IWebEventsProps {
    isLoaded: boolean;
    errors: string;
    data: IWebEvents[];
};

const initialState: IWebEventsProps = {
    isLoaded: true,
    errors: '',
    data: []
};

export const webEventsSlice = createSlice({
    name: 'webEventSlice',
    initialState,
    reducers: {
        fetchWebEvents(state) {
            state.isLoaded = true;
            state.errors = '';
        },

        fetchWebEventsSuccess(state, action) {
            state.data = action.payload;
            state.isLoaded = false;
            state.errors = '';
        },

        fetchWebEventsError(state, action) {
            state.isLoaded = false;
            state.errors = action.payload;
        }
    }
});

export default webEventsSlice.reducer;