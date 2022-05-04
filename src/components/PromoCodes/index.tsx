import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUnRegisterData, fetchRegisterUserData } from '../../store/thunks/userThunks';
import CheckCodes from '../../service/CheckPromoCodes';
import ErrorBoundary from '../../errors/ErrorBoundary';
import ActualPromo from './ActualPromo';
import UsedPromo from './UsedPromo';
import HistoryPromo from './HistoryPromo';
import { IPromoCode } from '../../types';

interface IResultCodes {
    actualCodes: IPromoCode[];
    history: IPromoCode[];
};

function PromoCodes(){
    const dispatch = useAppDispatch();
    const { promocodes, userPromocodes, server } = useAppSelector((state) => state.user);
    const [ resultCodes, setResultCodes ] = useState<IResultCodes | null>(null);

    useEffect(() => { // начало загрузки данных
        localStorage.getItem('token') ?
        dispatch(fetchRegisterUserData(server)) : dispatch(fetchUnRegisterData(server))

    }, [dispatch, server]);

    useEffect(() => { // проверка на загрузку данных
        if(promocodes.length){
            setResultCodes(CheckCodes(promocodes, userPromocodes));
        }
    }, [promocodes.length, promocodes, userPromocodes]);

    if(resultCodes){
        return(
            <ErrorBoundary>
                <ActualPromo data={resultCodes.actualCodes} />
                <UsedPromo data={userPromocodes} />
                <HistoryPromo data={resultCodes.history.reverse()} />
            </ErrorBoundary>
        );
    }

    return(
        <>
            <ActualPromo isLoading />
            <UsedPromo isLoading />
            <HistoryPromo isLoading />
        </>
    );
}

export default React.memo(PromoCodes);