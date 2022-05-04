import React from 'react';
import { IWebEvents } from '../../types';
import { Image } from "react-bootstrap";
import { TimeView, Card, EmptyContainer, Preloader } from '..';
import { useTranslation } from 'react-i18next';
import { EventLogo } from '../../media';
import { useAppSelector } from '../../hooks/redux';

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

    const renderWebEvents = (webEvent: IWebEvents) => {
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
            {data.length !== 0 ? (data.map(renderWebEvents)) : (<EmptyContainer />)}
        </>
    );
}