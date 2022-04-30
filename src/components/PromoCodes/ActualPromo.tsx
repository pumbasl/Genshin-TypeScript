import React from 'react';
import { IPromoCode } from '../../types';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { Card, EmptyContainer } from '../index';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchClickPromo } from '../../store/thunks/userThunks';
import sleep from '../../js/sleep';
import { Badge } from 'react-bootstrap';

interface ActualPromoProps {
    data: IPromoCode[];
};

interface IBadgeCheck {
    check: boolean;
};

const BadgeHOC = ({ check }: IBadgeCheck) => {
    if(check) return <Badge bg='purple'>New!</Badge>;
    return null;
};

function ActualPromo({ data }: ActualPromoProps){
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const userPromos = useAppSelector((state) => state.user.userPromocodes);

    const handleClick = async (promo: IPromoCode) => {
        if(localStorage.getItem('token')){
            toast.success(t('Вы будете перенаправлены на страницу ввода промокода через 2 секунды.')); //уведомление

            let tempArray: string[] = [];

            userPromos.forEach((promoOld: IPromoCode) => {
                tempArray.push(promoOld._id);
            })

            tempArray.push(promo._id);
            dispatch(fetchClickPromo(tempArray));
        } else {
            toast.success(t('Для сохранения промокодов Вам нужно авторизоваться или зарегистрировать свой аккаунт. Через две секунды Вас перенаправит на ввод промокода.')); //уведомление
        }

        await sleep(2000);

        try {
            const win = window.open(`https://genshin.hoyoverse.com/ru/gift?code=${promo.code}`, '_blank');
            win?.focus();
        } catch (e: any) {
            throw new Error(e);
        }
    };

    const renderPromocode = (promo: IPromoCode) => {
        return(
            <Card.Label key={promo._id}>
                <Card.Body onClick={() => { handleClick(promo) }}>
                    {promo.code} <BadgeHOC check={ Math.round((Date.now() - promo.created)/86400000) <= 2 } />
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
                <b>{t('Актуальные промокоды')}:</b>
            </h4>

            { data.length !== 0 ? (data.map(renderPromocode).reverse()) : (<EmptyContainer />) }
        </>
    );
}

export default React.memo(ActualPromo);