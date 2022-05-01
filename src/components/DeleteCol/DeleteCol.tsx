import React, { useEffect } from 'react';
import { CloseButton } from 'react-bootstrap';
import { IPromoCode, IWebEvents } from '../../types/types';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchUserInfo } from '../../store/thunks/userThunks';

interface DeleteColProps {
    data: IPromoCode | IWebEvents
}

const DeleteCol = ({ data }: DeleteColProps) => {
    const dispatch = useAppDispatch();
    const { userinfo, token } = useAppSelector((state) => state.user);

    const handleClick = ({ data }: DeleteColProps) => {
        console.log(data)
    };

    useEffect(() => {
       if(token) dispatch(fetchUserInfo());
    }, [dispatch, token]);

    if(userinfo?.roles.includes('Admin')) return <CloseButton className='ms-2' onClick={() => handleClick({ data })} />;

    return null;
}

export default DeleteCol;