import { alertSlice } from '../reducers/alertSlice';

import {
    
} from '../../graphql';

//notify
import { toast } from 'react-hot-toast';
//

import Fetch from '../../fetch/fetch';
import ErrorCatch from '../../js/ErrorCatcher';

const alertActions = alertSlice.actions;

export function fetchAlerts(data){
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