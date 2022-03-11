import {
    setUsers
} from '../actions/adminActions';

import {
    setErrors
} from '../actions/userActions';

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

export function fetchAddWebEvent(data){
    return async (dispatch) => {
        await Fetch({
            query: addWebEvent,
            variables: JSON.stringify(data)
        }, 'api')
        .then(
            (response) => {
                if(response?.error){
                    dispatch(setErrors(response.message));
                } else {
                    toast({title: "Уведомление", body: 'Веб-ивент успешно создан', time: "Несколько секунд назад"}); //уведомление
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
                dispatch(setUsers(response.regUsers));
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
                    dispatch(setErrors(response.message));
                } else {
                    toast({title: "Уведомление", body: 'Новость успешно создана', time: "Несколько секунд назад"}); //уведомление
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
                    dispatch(setErrors(response.message));
                } else {
                    toast({title: "Уведомление", body: 'Промокод успешно добавлен', time: "Несколько секунд назад"}); //уведомление
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
                    dispatch(setErrors(response.message));
                } else {
                    toast({title: "Уведомление", body: 'Пользователь успешно сохранен.', time: "Несколько секунд назад"}); //уведомление
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
                dispatch(setUsers(response.searchUsersByName));
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
                    toast({title: "Уведомление", body: 'Авторизация успешно сброшена.', time: "Несколько секунд назад"}); //уведомление
                } else {
                    toast({title: "Уведомление", body: 'Что то пошло не так.', time: "Несколько секунд назад"}); //уведомление
                }
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        );
    };
}