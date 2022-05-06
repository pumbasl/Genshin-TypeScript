import React from 'react';
import { IWebEvents } from '../../types';
import { Image } from "react-bootstrap";
import { Card } from '..';
import { useTranslation } from 'react-i18next';
import { EventLogo } from '../../media';

const defaultEventsArray: IWebEvents[] = [{
    _id: 'defaultWevEvent1',
    created: 0,
    expired: 0,
    link: 'https://webstatic-sea.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481',
    name: 'HoYoLAB Ежедневная отметка'
}];

const DefaultEvents = () => {
    const { t } = useTranslation();

    const handleClick = async (webEvent: IWebEvents) => {
        try {
            const win = window.open(webEvent.link, '_blank');
            win?.focus();
        } catch (e: any) {
            throw new Error(e);
        }
    };

    const renderComponent = (webEvent: IWebEvents) => (
        <Card
            data={webEvent}
            key={webEvent._id}
            expiredText={<b>{t('Постоянный')}</b>}
            handleClick={() => handleClick(webEvent)}
        >
            <Image src={EventLogo} width="25px" height="100%" />
            &nbsp;
            {t(webEvent.name)}
            &nbsp;
        </Card>
    );

    return(
        <>
            {defaultEventsArray.map(renderComponent)}
        </>
    );
};

export default React.memo(DefaultEvents);