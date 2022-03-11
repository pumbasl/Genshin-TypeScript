import Fetch from '../../fetch/fetch';
import ErrorCatch from '../../js/ErrorCatcher';
import { toast } from 'react-hot-toast';

import {
    setThreads,
    setThread
} from '../actions/threadsActions';

import {
    allThreads,
    getThreadById,
    addThread
} from '../../graphql';

export function fetchAddThread(data){
    return async (dispatch) => {
        await Fetch({
            query: addThread,
            variables: JSON.stringify(data)
        }, 'api')
        .then(
            (response) => {
                if(response.addNewThread){
                    toast({title: "Уведомление", body: 'Статься успешно создана', time: "Несколько секунд назад"});
                } else {
                    toast({title: "Уведомление", body: 'Ошибка', time: "Несколько секунд назад"});
                }
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        );
    };
}

export function fetchThread(id){
    return async (dispatch) => {
        await Fetch({
            query: getThreadById,
            variables: JSON.stringify({ id })
        }, 'api')
        .then(
            (response) => {
                dispatch(setThread(response?.getThreadById));
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        );
    };
}

export function fetchThreads(){
    return async (dispatch) => {
        await Fetch({
            query: allThreads,
            variables: {}
        }, 'api')
        .then(
            (response) => {
                dispatch(setThreads(response?.threads.reverse()));
            },
            (error) => {
                ErrorCatch(error, dispatch);
            }
        )
    };
}