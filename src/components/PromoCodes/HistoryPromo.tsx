import React from 'react';

// Locales
import { useTranslation } from 'react-i18next';
import { IPromoCode } from 'src/types/types';
//

//Components
import { Card, EmptyContainer } from '../index';
//

interface HistoryProps{
    data: IPromoCode[];
};

function History({ data }: HistoryProps){
    const { t } = useTranslation();

    const renderPromocode = (promo: IPromoCode) => {
        return(
            <Card.Label key={promo._id}>
                <Card.Body>
                    {promo.code}
                    <Card.Time expired={promo.expired}>
                        {t('Действовал до')}: &nbsp; 
                    </Card.Time>
                </Card.Body>
            </Card.Label>
        );
    };

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