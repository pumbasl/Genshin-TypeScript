import React from 'react';


//Style
import { Image } from "react-bootstrap";
//

//components
import { Card, EmptyContainer } from '../';
//

// Locales
import { useTranslation } from 'react-i18next';
//

//Pictures
import { EventLogo } from '../../media';
//

//redux
import { useSelector } from 'react-redux';
//

export default function WebEvents(){
    const { t } = useTranslation();
    const webEvents = useSelector((state) => state.user.webEvents);

    const handleClick = async (webEvent) => {
        try {
            const win = window.open(webEvent.link, '_blank');
            win?.focus();
        } catch (e) {
            throw new Error(e);
        }
    };

    const renderWebEvents = (webEvent) => {
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

    return(
        <>
            <h4>
                <b>{t('Браузерные события')}:</b>
            </h4>

            { webEvents.length !== 0 ? (webEvents.map(renderWebEvents)) : (<EmptyContainer />) }
        </>
    );
}