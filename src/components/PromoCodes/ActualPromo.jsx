import React from 'react';

// Locales
import { useTranslation } from 'react-i18next';
//

//notify
import { toast } from 'react-hot-toast';
//

//Components
import { Card, EmptyContainer } from '../index';
//

//redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchClickPromo } from '../../store/thunks/userThunks';
//

import sleep from '../../js/sleep';

function ActualPromo({ data }){
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userPromos = useSelector((state) => state.user.userPromocodes);

    const handleClick = async (promo) => {
    if(localStorage.getItem('token')){
            toast({title: t('Уведомление'), body: t('Вы будете перенаправлены на страницу ввода промокода через 2 секунды.'), time: t('Несколько секунд назад')}); //уведомление

            let tempArray = [];

            userPromos.forEach((promoOld) => {
                tempArray.push(promoOld._id);
            })

            tempArray.push(promo._id);
            dispatch(fetchClickPromo(tempArray));

            await sleep(2000);
            
            try {
                const win = window.open(`https://genshin.mihoyo.com/en/gift?code=${promo.code}`, '_blank');
                win?.focus();
            } catch (e) {
                throw new Error(e);
            }
        } else {
            toast({title: t('Уведомление'), body: t('Для сохранения промокодов Вам нужно авторизоваться или зарегистрировать свой аккаунт. Через две секунды Вас перенаправит на ввод промокода.'), time: t('Несколько секунд назад')}); //уведомление

            await sleep(2000);
            
            try {
                const win = window.open(`https://genshin.mihoyo.com/en/gift?code=${promo.code}`, '_blank');
                win?.focus();
            } catch (e) {
                throw new Error(e);
            }
        }
    };

    const renderPromocode = (promo) => {
        return(
            <Card.Label key={promo._id}>
                <Card.Body onClick={() => { handleClick(promo) }}>
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
                <b>{t('Актуальные промокоды')}:</b>
            </h4>

            { data.length !== 0 ? (data.map(renderPromocode)) : (<EmptyContainer />) }
        </>
    );
}

export default React.memo(ActualPromo);