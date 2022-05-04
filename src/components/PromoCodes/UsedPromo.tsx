import React from 'react';

import { IPromoCode } from '../../types';
import { useTranslation } from 'react-i18next';
import { Card, EmptyContainer, Preloader, TimeView } from '../index';

interface ActivatedProps {
    data?: IPromoCode[];
    isLoading?: boolean;
};

function Activated({ data, isLoading }: ActivatedProps){
    const { t } = useTranslation();

    let copyArrayData = data?.slice(0);
    copyArrayData = copyArrayData?.reverse();

    const Header = () => (
        <h4>
            <b>{t('Активированные промокоды')}:</b>
        </h4>
    );

    const renderPromocode = (promo: IPromoCode) => (
        <Card
            data={promo}
            key={promo._id}
            expiredText={<TimeView time={promo.expired}> {t('Действует до')}: &nbsp; </TimeView>}
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

    return(
        <>
            <Header />
            { copyArrayData?.length !== 0 ? (copyArrayData?.slice(0, 5).map(renderPromocode)) : (<EmptyContainer />) }
        </>
    );
}

export default React.memo(Activated);