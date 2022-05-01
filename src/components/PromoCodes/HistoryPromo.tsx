import React from 'react';

// Locales
import { useTranslation } from 'react-i18next';
import { IPromoCode } from '../../types';
//

//Components
import { Card, EmptyContainer, TimeView } from '../index';
//

interface HistoryProps{
    data: IPromoCode[];
};

function History({ data }: HistoryProps){
    const { t } = useTranslation();

    const renderPromocode = (promo: IPromoCode) => (
        <Card
            data={promo}
            key={promo._id}
            expiredText={<TimeView time={promo.expired}> {t('Действовал до')}: &nbsp; </TimeView>}
        >
            {promo.code}
        </Card>
    );

    return(
        <>
            <h4>
                <b>{t('Истёкшие промокоды')}:</b>
            </h4>

            { data.length !== 0 ? (data.slice(0, 5).map(renderPromocode)) : (<EmptyContainer />) }
        </>
    );
}

export default React.memo(History);