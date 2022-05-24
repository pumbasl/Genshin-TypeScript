import { userSlice } from '../store/reducers/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

const actions = userSlice.actions;

export default function ErrorCatch(error, dispatch){
    if(error?.response?.status === 401){
        console.log('FAILED REFRESH TOKEN | LOGOUT');
        axios.get(`${process.env.REACT_APP_ENDPOINT}logout`, { withCredentials: true });
        delete localStorage.token;
        dispatch(actions.setToken(null));
        dispatch(actions.setUserPromoCodes([]));
        toast.error('Error AUTH');
    } else {
        toast.error(error.message);
    }
}