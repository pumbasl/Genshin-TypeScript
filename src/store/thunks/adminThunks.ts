import { userSlice } from '../reducers/userSlice';
import { adminSlice } from '../reducers/adminSlice';

import {
    allUsers,
    logoutUser,
    searchUsers,
    editUser,
    addPromoCode,
    addNews,
    addWebEvent
} from '../../graphql';

//notify
import { toast } from 'react-hot-toast';
//

import Fetch from '../../features/axios';
import ErrorCatch from '../../js/ErrorCatcher';
import { AppDispatch } from '../store';
import { IAddNewsData, IAddPromoData, IEditUserData, IError, IWebEventsData } from '../../types';
import { IAllUsersResponse, ILogOutForUserResponse, ISearchUserByLoginResponse } from './types/adminResponseTypes';

const userActions = userSlice.actions;
const adminActions = adminSlice.actions;

export function fetchAddWebEvent(data: IWebEventsData){
    return async (dispatch: AppDispatch) => {
        try {
            await Fetch.post('api', {
                query: addWebEvent,
                variables: JSON.stringify(data)
            });

            toast.success('Веб-ивент успешно создан'); //уведомление
        } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
        }
    };
}

export function fetchAdminAllUsers(){
    return async (dispatch: AppDispatch) => {
        try {
            const response = await Fetch.post<IAllUsersResponse>('api', {
                query: allUsers,
                variables: {}
            });
            
            dispatch(adminActions.setAdminUsers(response.data.regUsers));
        } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
        }
    };
}

export function fetchAddNews(data: IAddNewsData){
    return async (dispatch: AppDispatch) => {
        try {
            await Fetch.post('api', {
                query: addNews,
                variables: JSON.stringify(data)
            });
    
            toast.success('Новость успешно создана'); //уведомление
        } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
        }
    };
}

export function fetchAddPromoCode(data: IAddPromoData){
    return async (dispatch: AppDispatch) => {
        try {
            await Fetch.post('api', {
                query: addPromoCode,
                variables: JSON.stringify(data)
            });
    
            toast.success('Промокод успешно добавлен'); //уведомление
        } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
        }
    };
}

export function fetchEditUser(data: IEditUserData){
    return async (dispatch: AppDispatch) => {
        try {
            await Fetch.post('api', {
                query: editUser,
                variables: JSON.stringify(data)
            });
    
            toast.success('Пользователь успешно сохранен.'); //уведомление
        } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
        }
    };
}

export function fetchSearchUsers(name: string){
    return async (dispatch: AppDispatch) => {
        try {
            const response = await Fetch.post<ISearchUserByLoginResponse>('api', {
                query: searchUsers,
                variables: JSON.stringify({ name })
            });
    
            dispatch(adminActions.setAdminUsers(response.data.searchUsersByName));
        } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
        }
    };
}

export function fetchLogOutUser(id: string){
    return async (dispatch: AppDispatch) => {
        try {
            const response = await Fetch.post<ILogOutForUserResponse>('api', {
                query: logoutUser,
                variables: JSON.stringify({
                    id
                })
            });
            
            if(response.data.revokeRefreshTokensForRegUser){
                toast.success('Авторизация успешно сброшена.'); //уведомление
            } else {
                toast.error('Что то пошло не так.'); //уведомление
            }
        } catch (error) {
            const err = error as IError;
            ErrorCatch(err, dispatch);
        }
    };
}