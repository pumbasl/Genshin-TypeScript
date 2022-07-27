import React from 'react';

import { useTranslation } from 'react-i18next';
import { IPromoCode } from '../../types';
import { Card, EmptyContainer, TimeView, Preloader } from '../index';

interface HistoryProps{
    data?: IPromoCode[];
    isLoading?: boolean;
};

function History({ data, isLoading }: HistoryProps){
    const { t } = useTranslation();

    const Header = () => (
        <h4>
            <b>{t('Истёкшие промокоды')}:</b>
        </h4>
    );

    const renderPromocode = (promo: IPromoCode) => (
        <Card
            data={promo}
            key={promo._id}
            expiredText={<TimeView time={promo.expired}> {t('Действовал до')}: &nbsp; </TimeView>}
        >
            {promo.code}
        </Card>
    );

    if(isLoading) {
        return(
            <>
                <Header />
                <Preloader skeleton />
            </>
        );
    }

    const codes = data?.length !== 0 ? (data?.slice(0, 5).reverse().map(renderPromocode)) : <EmptyContainer />;

    return(
        <>
            <Header />
            { codes }
        </>
    );
}

export default React.memo(History);