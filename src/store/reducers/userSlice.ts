import { createSlice } from "@reduxjs/toolkit";

import { IUserinfo, IPromoCode, IWebEvents } from '../../types';

export interface StateProps {
    token: string | null;
    server: string;
    webEvents: IWebEvents[];
    errorsAuth: string | null;
    userinfo: IUserinfo | null;
    promocodes: IPromoCode[];
    userPromocodes: IPromoCode[];
    threads: string[];
    news: string[] | null;
};

const initialState: StateProps = {
    token: localStorage.getItem('token') || null,
    server: localStorage.getItem('server') || 'Europe',
    webEvents: [],
    errorsAuth: null,
    userinfo: null,
    promocodes: [],
    userPromocodes: [],
    threads: [],
    news: null
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setPromoCodes(state, action) {
            state.promocodes = action.payload;
        },

        setNews(state, action) {
            state.news = action.payload;
        },

        setUserInfo(state, action) {
            state.userinfo = action.payload;
        },

        setErrors(state, action) {
            state.errorsAuth = action.payload;
        },

        setToken(state, action) {
            state.token = action.payload;
        },

        setWebEvents(state, action) {
            state.webEvents = action.payload;
        },

        setUserPromoCodes(state, action) {
            state.userPromocodes = action.payload;
        },

        setServer(state, action) {
            state.server = action.payload;
        }
    }
});

export default userSlice.reducer;