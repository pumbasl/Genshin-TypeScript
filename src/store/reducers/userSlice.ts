import { createSlice } from "@reduxjs/toolkit";
import { IUserinfo, IPromoCode, INews } from '../../types';

export interface IUserProps {
    token: string | null;
    server: string;
    errorsAuth: string | null;
    userinfo: IUserinfo | null;
    promocodes: IPromoCode[];
    userPromocodes: IPromoCode[];
    news: INews[];
};

const initialState: IUserProps = {
    token: localStorage.getItem('token') || null,
    server: localStorage.getItem('server') || 'Europe',
    errorsAuth: null,
    userinfo: null,
    promocodes: [],
    userPromocodes: [],
    news: []
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

        setUserPromoCodes(state, action) {
            state.userPromocodes = action.payload;
        },

        setServer(state, action) {
            state.server = action.payload;
        }
    }
});

export default userSlice.reducer;