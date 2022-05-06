import React from 'react';
import { IWebEvents } from '../../types';
import { Image } from "react-bootstrap";
import { TimeView, Card, EmptyContainer, Preloader } from '..';
import { useTranslation } from 'react-i18next';
import { EventLogo } from '../../media';
import { useAppSelector } from '../../hooks/redux';

const defaultEventsArray: IWebEvents[] = [{
    _id: 'defaultWevEvent1',
    created: 0,
    expired: 0,
    link: 'https://webstatic-sea.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481',
    name: 'HoYoLAB Ежедневная отметка'
}];

export default function WebEvents(){
    const { t } = useTranslation();
    const { data, errors, isLoaded } = useAppSelector((state) => state.webEvents);
    
    const handleClick = async (webEvent: IWebEvents) => {
        try {
            const win = window.open(webEvent.link, '_blank');
            win?.focus();
        } catch (e: any) {
            throw new Error(e);
        }
    };

    const RenderWebEvents = (webEvent: IWebEvents) => {
        if(webEvent.expired < Date.now()) return null;

        return(
            <Card
                data={webEvent}
                key={webEvent._id}
                expiredText={<TimeView time={webEvent.expired}> {t('Действует до')}: &nbsp; </TimeView>}
                handleClick={() => handleClick(webEvent)}
            >
                <Image src={EventLogo} width="25px" height="100%" />
                &nbsp;
                {webEvent.name}
                &nbsp;
            </Card>
        );
    };

    const DefaultEvents = (webEvent: IWebEvents) => {
        return(
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
    };

    const DefaultComponent = () => (
        <h4>
            <b>{t('Браузерные события')}:</b>
        </h4>
    );
    
    if(isLoaded) return(
        <div className='mb-4'>
            <DefaultComponent />
            <Preloader skeletonSmall />
        </div>
    );

    if(errors !== '') return(
        <>
            <DefaultComponent />
            #error
        </>
    );

    return(
        <>
            <DefaultComponent />
            {defaultEventsArray.map(DefaultEvents)}
            {data.length !== 0 ? (data.map(RenderWebEvents)) : (<EmptyContainer />)}
        </>
    );
}