import React, { useEffect, useState } from 'react';

//redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUnRegisterData, fetchRegisterUserData } from '../../store/thunks/userThunks';
//

//service
import CheckCodes from '../../service/CheckPromoCodes';
//

//error
import ErrorBoundary from '../../errors/ErrorBoundary';
//

//components
import ActualPromo from './ActualPromo';
import UsedPromo from './UsedPromo';
import HistoryPromo from './HistoryPromo';
import { Preloader } from '../index';
import { IPromoCode } from 'src/types/types';
//

interface IResultCodes {
    actualCodes: IPromoCode[];
    history: IPromoCode[];
};

function PromoCodes(){
    const dispatch = useAppDispatch();
    const promocodes = useAppSelector((state) => state.user.promocodes);
    const userPromocodes = useAppSelector((state) => state.user.userPromocodes);
    const server = useAppSelector((state) => state.user.server);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ resultCodes, setResultCodes ] = useState<IResultCodes | null>(null);

    useEffect(() => { // начало загрузки данных
        localStorage.getItem('token') ?
        dispatch(fetchRegisterUserData(server)) : dispatch(fetchUnRegisterData(server))

    }, [dispatch, server]);

    useEffect(() => { // проверка на загрузку данных
        if(promocodes.length){
            setIsLoading(true);
            setResultCodes(CheckCodes(promocodes, userPromocodes));
        }
    }, [promocodes.length, userPromocodes]);

    if(!isLoading) {
        return(
            <Preloader />
        )
    }

    if(resultCodes){
        return(
            <ErrorBoundary>
                <ActualPromo data={resultCodes.actualCodes} />
                <UsedPromo data={userPromocodes} />
                <HistoryPromo data={resultCodes.history.reverse()} />
            </ErrorBoundary>
        );
    }

    return(null);
}

export default React.memo(PromoCodes);