import React from 'react';
import { useTranslation } from 'react-i18next';
import { CloseButton } from 'react-bootstrap';
import { AlertStyle, ColorLink } from './style';
import useLocalStorage from '../../hooks/useLocalStorage';

const TransferAlert = () => {
    const { t } = useTranslation();
    const [ show, setShow ] = useLocalStorage('transferAlert', true);

    const handleCloseButton = () => {
        setShow(false);
    };

    if(!show) return null;

    return(
        <AlertStyle className='text-center clearfix' bgColor='purple'>
            {t('С 1 августа наш сайт временно переезжает на новый адрес -')}
            <ColorLink>
                <a href='https://genshin-promo.web.app/' target="_blank" rel="noreferrer">
                    genshin-promo.web.app
                </a>
            </ColorLink>

            <div style={{ float: 'right' }}>
                <CloseButton onClick={handleCloseButton} variant="white" title='Close' />
            </div>
        </AlertStyle>
    );
};

const WarAlert = () => {
    const { t } = useTranslation();

    return(
        <AlertStyle className='text-center'>
            {t('Поддержите Украину')} 🇺🇦 
            <ColorLink>
                <a href='https://opensource.fb.com/support-ukraine'>
                    {t('Помогите с гуманитарной помощью Украине. Россияне, не молчите! Нет войне!')}
                </a>
            </ColorLink>
        </AlertStyle>
    );
};

const Alerts = { War: WarAlert, Transfer: TransferAlert };

export default Alerts;