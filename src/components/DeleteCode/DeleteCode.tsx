import React, { useEffect } from 'react';
import { CloseButton } from 'react-bootstrap';
import { IPromoCode } from '../../types';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchUserInfo } from '../../store/thunks/userThunks';

interface DeleteCodeProps {
    code: IPromoCode
}

const DeleteCode = ({ code }: DeleteCodeProps) => {
    const dispatch = useAppDispatch();
    const { userinfo } = useAppSelector((state) => state.user);

    const handleClick = (code: IPromoCode) => {
        console.log(code)
    };

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);

    if(userinfo?.roles.includes('Admin')) return <CloseButton onClick={() => handleClick(code)} />;

    return null;
}

export default DeleteCode;