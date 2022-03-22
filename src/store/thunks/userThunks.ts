import Fetch from '../../fetch/fetch';
import ErrorCatch from '../../js/ErrorCatcher';

import { userSlice } from '../reducers/userSlice';
import { INews } from 'src/types/types';

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

export function fetchLogout(){
    return async (dispatch) => {
        await Fetch({}, 'logout')
        .then(
            (_response) => {
                delete localStorage.token;
                dispatch(actions.setToken(null));
                dispatch(actions.setUserInfo(null));
                dispatch(actions.setUserPromoCodes([]));
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        )
    };
}

export function fetchNews(){
    interface ResponseProps {
        getNews: INews[];
    }
    return async (dispatch) => {
        await Fetch({
            query: getNews,
            variables: {}
        }, 'api')
        .then(
            (response: ResponseProps) => {
                dispatch(actions.setNews(response.getNews.reverse()));
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        )
    };
}

export function fetchNewAvatar(url, ref) {
    return async (dispatch) => {
        await Fetch({
            query: setAvatar,
            variables: JSON.stringify({
                url,
                ref
            })
        }, 'api')
        .then(
            (response) => {
                console.log('ok');
                dispatch(fetchUserInfo());
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        );
    };
}

export function fetchNewUserGameInfo(data){
    return async (dispatch) => {
        await Fetch({
            query: UserGameInfo,
            variables: JSON.stringify(data)
        }, 'api')
        .then(
            (response) => {
                console.log('ok');
            },

            (error) => {
                ErrorCatch(error, dispatch);
            }
        );
    };
}

export function fetchUserInfo(){
    return async (dispatch) => {
        await Fetch({
            query: regUser,
            variables: {}
        }, 'api')
        .then(
            (response) => {
                dispatch(actions.setUserInfo(response.regUser));
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        );
    };
}

export function fetchRegistration(data){
    console.log(data)
    return async (dispatch) => {
        await Fetch({
            query: registration,
            variables: JSON.stringify({
                ...data,
                ua: window.navigator.userAgent
            })
        }, 'api')
        .then(
            (response) => {
                if(response?.error){
                    dispatch(actions.setErrors(response.message));
                } else {
                    const token = response.registration.accessToken;
                    localStorage.setItem('token', token);
                    dispatch(actions.setToken(token));
                }
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        );
    }
}

export function fetchLogin(data){
    const { login, password } = data;
    return async (dispatch) => {
        await Fetch({
            query: loginQuery,
            variables: JSON.stringify({
                login: login,
                password: password
            })
        }, 'api')
        .then(
            (response) => {
                if(response?.error){
                    dispatch(actions.setErrors(response.message));
                } else {
                    const token = response.login.accessToken;
                    localStorage.setItem('token', token);
                    dispatch(actions.setToken(token));
                }
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        )
    }
}

export function fetchClickPromo(promos){
    return async (dispatch) => {
        await Fetch({
            query: newUserPromo,
            variables: JSON.stringify({
                promos: promos
            })
        }, 'api')
        .then(
            (response) => {
                dispatch(actions.setUserPromoCodes(response.editRegUserPromos.promos));
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        )
    }
}

export function fetchChangeServer(server){
    return async (dispatch) => {
        await Fetch({
            query: changeServer,
            variables: JSON.stringify({
                server: server
            })
        }, 'api')
        .then(
            (response) => {
                dispatch(actions.setServer(server));
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
       )
    }
}

export function fetchRegisterUserData(server){
    return async (dispatch) => {
        await Fetch({
            query: getRegisterUserData,
            variables: JSON.stringify({
                server: server
            })
        }, 'api')
        .then(
            (response) => {
                dispatch(actions.setUserPromoCodes(response?.getRegUserPromo.promos));
                dispatch(actions.setPromoCodes(response?.promosByServer));
                dispatch(actions.setWebEvents(response?.subfields));
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        )
    }
}

export function fetchUnRegisterData(server){
    return async (dispatch) => {
        await Fetch({
            query: getUnRegisterData,
            variables: JSON.stringify({
                server: server
            })
        }, 'api')
        .then(
            (response) => {
                dispatch(actions.setPromoCodes(response?.promosByServer));
                dispatch(actions.setWebEvents(response?.subfields));
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        )
    }
}