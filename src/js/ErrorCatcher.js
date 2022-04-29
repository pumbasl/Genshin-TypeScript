import { userSlice } from '../store/reducers/userSlice';
import Fetch from '../fetch/fetch';
import toast from 'react-hot-toast';

const actions = userSlice.actions;

export default function ErrorCatch(error, dispatch){
    if(error.message === 'FAIL_UPDATE_TOKENS'){
        console.log('FAILED REFRESH TOKEN | LOGOUT');
        Fetch({}, 'logout');
        delete localStorage.token;
        dispatch(actions.setToken(null));
        dispatch(actions.setUserPromoCodes([]));
    } else {
        toast.error(error.message);
    }
}