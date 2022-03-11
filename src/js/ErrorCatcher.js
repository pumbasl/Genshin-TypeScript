import {
    setUserPromoCodes,
    setToken
} from '../store/actions/userActions';
import Fetch from '../fetch/fetch';

export default function ErrorCatch(error, dispatch){
    if(error.message === 'FAIL_UPDATE_TOKENS'){
        console.log('FAILED REFRESH TOKEN | LOGOUT');
        Fetch({}, 'logout');
        delete localStorage.token;
        dispatch(setToken(null));
        dispatch(setUserPromoCodes([]));
    } else {
        console.log(error);
    }
}