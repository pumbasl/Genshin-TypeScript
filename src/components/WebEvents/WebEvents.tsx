import React from 'react';
import { IWebEvents } from '../../types';

//Style
import { Image } from "react-bootstrap";
//

//components
import { Card, EmptyContainer, Preloader } from '..';
//

// Locales
import { useTranslation } from 'react-i18next';
//

//Pictures
import { EventLogo } from '../../media';
//

//redux
import { useAppSelector } from '../../hooks/redux';
//

export default function WebEvents(){
    const { t } = useTranslation();
    const webEvents = useAppSelector((state) => state.webEvents.data);
    const isLoaded = useAppSelector((state) => state.webEvents.isLoaded);
    const errors = useAppSelector((state) => state.webEvents.errors);

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
            {webEvents.length !== 0 ? (webEvents.map(renderWebEvents)) : (<EmptyContainer />)}
        </>
    );
}