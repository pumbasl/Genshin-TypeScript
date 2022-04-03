import React from 'react';

import { IPromoCode } from '../../types';

// Locales
import { useTranslation } from 'react-i18next';
//

//Components
import { Card, EmptyContainer } from '../index';
//

interface ActivatedProps {
    data: IPromoCode[];
};

function Activated({ data }: ActivatedProps){
    const { t } = useTranslation();

    let copyArrayData = data.slice(0);
    copyArrayData = copyArrayData.reverse();

    const renderPromocode = (promo: IPromoCode) => {
        return(
            <Card.Label key={promo._id}>
                <Card.Body>
                    {promo.code}
                    <Card.Time expired={promo.expired}>
                        {t('Действует до')}: &nbsp; 
                    </Card.Time>
                </Card.Body>
            </Card.Label>
        );
    };

    return(
        <>
            <h4>
                <b>{t('Активированные промокоды')}:</b>
            </h4>

            { copyArrayData.length !== 0 ? (copyArrayData.slice(0, 5).map(renderPromocode)) : (<EmptyContainer />) }
        </>
    );
}

export default React.memo(Activated);