import Fetch from '../../features/axios';
import ErrorCatch from '../../js/ErrorCatcher';
import { IGetNewsResponse, ILoginResponse, IRegistreationResponse, IRegUserInfoResponse, IUserRegData } from './types/userResponseTypes';
import { IError, IGameInfo, ILoginData, IPromoCode, IRegistradionData, IServer } from '../../types';
import { userSlice } from '../reducers/userSlice';
import { webEventsSlice } from '../reducers/webEventsSlice';
import { AppDispatch } from '../store';

import {
    getUnRegisterData,
    changeServer,
    getRegisterUserData,
    newUserPromo,
    login as loginQuery,
    registration,
    regUser,
    UserGameInfo,
    getNews,
    setAvatar
} from '../../graphql';

const actions = userSlice.actions;
const webEventsActions = webEventsSlice.actions;

export function fetchLogout(){
    return async (dispatch: AppDispatch) => {
        Fetch.get('logout').then(() => {
            delete localStorage.token;
            dispatch(actions.setToken(null));
            dispatch(actions.setUserInfo(null));
            dispatch(actions.setUserPromoCodes([]));
        });
    };
}

export function fetchNews(){
    return async (dispatch: AppDispatch) => {
        try {
            const response = await Fetch.post<IGetNewsResponse>('api', {
                query: getNews,
                variables: {}
            });
    
            if(response.data){
                dispatch(actions.setNews(response.data.getNews.reverse()));
            }
        } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
        }
    };
}

export function fetchNewAvatar(url: string, ref: string) {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await Fetch.post('api', {
                query: setAvatar,
                variables: JSON.stringify({
                    url,
                    ref
                })
            });
    
            if(response.data){
                console.log('ok');
                dispatch(fetchUserInfo());
            }
        } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
        }
    };
}

export function fetchNewUserGameInfo(data: IGameInfo){
    return async (dispatch: AppDispatch) => {
        try {
            await Fetch.post('api', {
                query: UserGameInfo,
                variables: JSON.stringify(data)
            });
        } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
        }
    };
}

export function fetchUserInfo(){
    return async (dispatch: AppDispatch) => {
        try {
            const response = await Fetch.post<IRegUserInfoResponse>('api', {
                query: regUser,
                variables: {}
            });
    
            if(response.data){
                dispatch(actions.setUserInfo(response.data.regUser));
            }
        } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
        }
    };
}

export function fetchRegistration(data: IRegistradionData){
    console.log(data)
    return async (dispatch: AppDispatch) => {
       try {
            const response = await Fetch.post<IRegistreationResponse>('api', {
                query: registration,
                variables: JSON.stringify({
                    ...data,
                    ua: window.navigator.userAgent
                })
            });

            if(response.data){
                const token = response.data.registration.accessToken;
                localStorage.setItem('token', token);
                dispatch(actions.setToken(token));
            }
       } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
       }
    }
}

export function fetchLogin(data: ILoginData){
    const { login, password } = data;
    return async (dispatch: AppDispatch) => {
        try {
            const response = await Fetch.post<ILoginResponse>('api', {
                query: loginQuery,
                variables: JSON.stringify({
                    login: login,
                    password: password
                })
            });

            if(response.data){
                const token = response.data.login.accessToken;
                localStorage.setItem('token', token);
                dispatch(actions.setToken(token));
            }
        } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
        }
    }
}

export function fetchClickPromo(promoClicked: IPromoCode, allUsersPromocodes: IPromoCode[]){
    return async (dispatch: AppDispatch) => {
        try {
            const response = await Fetch.post('api', {
                query: newUserPromo,
                variables: JSON.stringify({
                    promos: promoClicked._id
                })
            });

            if(response.data){
                dispatch(actions.setUserPromoCodes(allUsersPromocodes));
            }
        } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
        }
    }
}

export function fetchChangeServer({ server }: IServer){
    return async (dispatch: AppDispatch) => {
        try {
            const response = await Fetch.post('api', {
                query: changeServer,
                variables: JSON.stringify({
                    server
                })
            });

            if(response.data){
                dispatch(actions.setServer(server));
            }
        } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
        }
    }
}

export function fetchRegisterUserData({ server }: IServer){
    return async (dispatch: AppDispatch) => { 
        try {
            const response = await Fetch.post<IUserRegData>('api', {
                query: getRegisterUserData,
                variables: JSON.stringify({
                    server
                })
            });
    
            if(response.data){
                dispatch(actions.setUserPromoCodes(response.data.getRegUserPromo.promos));
                dispatch(actions.setPromoCodes(response.data.promosByServer));
                dispatch(webEventsActions.fetchWebEventsSuccess(response.data.subfields));
            }
        } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
        }
    }
}

export function fetchUnRegisterData({ server }: IServer){
    return async (dispatch: AppDispatch) => {
        try {
            const response = await Fetch.post('api', {
                query: getUnRegisterData,
                variables: JSON.stringify({
                    server
                })
            });
    
            if(response.data){
                dispatch(actions.setPromoCodes(response.data.promosByServer));
                dispatch(webEventsActions.fetchWebEventsSuccess(response.data.subfields));
            }
        } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
        }
    }
}