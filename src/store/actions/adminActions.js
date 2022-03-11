import { createAction } from '@reduxjs/toolkit';

import {
    SET_ADMIN_USERS
} from '../types/types';

export const setUsers = createAction(SET_ADMIN_USERS, prepare);

function prepare(a) {
    return {
        payload: a
    };
}