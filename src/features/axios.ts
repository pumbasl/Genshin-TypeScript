import axios from 'axios';
import { IRefreshResponse } from '../types/types';

const api = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
        cache: 'no-cache',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': process.env.REACT_APP_ENDPOINT
    },
    withCredentials: true
});

api.interceptors.request.use((config) => {
    (config.headers ??= {}).authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

api.interceptors.response.use(async (response) => {
    const originalRequest = response.config;

    if(response.data.errors){
        for(const value of response.data.errors){
            if(value.message === 'not authenticated'){
                const response = await axios.get<IRefreshResponse>(`${process.env.REACT_APP_ENDPOINT}refresh_token`, { withCredentials: true });

                if(response.status === 401){
                    throw Error('FAIL_UPDATE_TOKENS');
                }

                if(response.data.ok) {
                    localStorage.setItem('token', response.data.accessToken);
                    return api.request(originalRequest);
                }
            } else {
                throw Error(value.message);
            }
        }
    }

    return response.data;
});

export default api;