import React from 'react';
import { IWebEvents } from '../../types';
import { Image } from "react-bootstrap";
import { Badge, Card, EmptyContainer, Preloader } from '..';
import { useTranslation } from 'react-i18next';
import { EventLogo } from '../../media';
import { useAppSelector } from '../../hooks/redux';
import getDays from '../../service/getDays';

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
            <Card.Label key={webEvent._id}>
                <Card.Body onClick={() => { handleClick(webEvent) }}>
                    <Image src={EventLogo} width="25px" height="100%" />
                    &nbsp;
                    {webEvent.name}
                    &nbsp;
                    
                    <Badge check={ getDays(webEvent.created) <= 4 }>
                        New!
                    </Badge>

                    <Card.Time expired={webEvent.expired}>
                        {t('Действует до')}: &nbsp;
                    </Card.Time>
                </Card.Body>
            </Card.Label>
        );
    };

    const DefaultComponent = () => (
        <h4>
            <b>{t('Браузерные события')}:</b>
        </h4>
    );
    
    if(isLoaded) return(
        <>
            <DefaultComponent />
            <Preloader />
        </>
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