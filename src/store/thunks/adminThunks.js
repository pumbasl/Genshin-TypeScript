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

import Fetch from '../../fetch/fetch';
import ErrorCatch from '../../js/ErrorCatcher';

const userActions = userSlice.actions;
const adminActions = adminSlice.actions;

export function fetchAddWebEvent(data){
    return async (dispatch) => {
        await Fetch({
            query: addWebEvent,
            variables: JSON.stringify(data)
        }, 'api')
        .then(
            (response) => {
                if(response?.error){
                    dispatch(userActions.setErrors(response.message));
                } else {
                    toast.success('Веб-ивент успешно создан'); //уведомление
                }
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        );
    };
}

export function fetchAdminAllUsers(){
    return async (dispatch) => {
        await Fetch({
            query: allUsers,
            variables: {}
        }, 'api')
        .then(
            (response) => {
                dispatch(adminActions.setAdminUsers(response.regUsers));
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        )
    };
}

export function fetchAddNews(data){
    return async (dispatch) => {
        await Fetch({
            query: addNews,
            variables: JSON.stringify(data)
        }, 'api')
        .then(
            (response) => {
                if(response?.error){
                    dispatch(userActions.setErrors(response.message));
                } else {
                    toast.success('Новость успешно создана'); //уведомление
                }
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        );
    };
}

export function fetchAddPromoCode(data){
    return async (dispatch) => {
        await Fetch({
            query: addPromoCode,
            variables: JSON.stringify(data)
        }, 'api')
        .then(
            (response) => {
                if(response?.error){
                    dispatch(userActions.setErrors(response.message));
                } else {
                    toast.success('Промокод успешно добавлен'); //уведомление
                }
            },

            (error) => {
                ErrorCatch(error, dispatch);
            }
        );
    };
}

export function fetchEditUser(data){
    return async (dispatch) => {
        await Fetch({
            query: editUser,
            variables: JSON.stringify(data)
        }, 'api')
        .then(
            (response) => {
                if(response?.error){
                    dispatch(userActions.setErrors(response.message));
                } else {
                    toast.success('Пользователь успешно сохранен.'); //уведомление
                }
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        );
    };
}

export function fetchSearchUsers(name){
    return async (dispatch) => {
        await Fetch({
            query: searchUsers,
            variables: JSON.stringify({
                name
            })
        }, 'api')
        .then(
            (response) => {
                dispatch(adminActions.setAdminUsers(response.searchUsersByName));
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        );
    };
}

export function fetchLogOutUser(id){
    return async (dispatch) => {
        await Fetch({
            query: logoutUser,
            variables: JSON.stringify({
                id
            })
        }, 'api')
        .then(
            (response) => {
                if(response.revokeRefreshTokensForRegUser){
                    toast.success('Авторизация успешно сброшена.'); //уведомление
                } else {
                    toast.error('Что то пошло не так.'); //уведомление
                }
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        );
    };
}