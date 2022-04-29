import React from 'react';
import { NavLink } from 'react-router-dom';

//Style
import { Nav } from "react-bootstrap";
//

//Pictures
import { MapLogo, WikiLogo, GenshinLogo } from '../../media';
//

// Locales
import { useTranslation } from 'react-i18next';
//

export default function Subfields(){
    const { t } = useTranslation();
    return(
        <Nav className="me-auto">
            <Nav.Link
                className="custom-link"
                as={NavLink}
                to="/news"
            >
                <img src={WikiLogo} width="18px" height="100%" className="ms-1 me-2 mb-1" alt="wikiLogo" />
                {t('Новости')}
            </Nav.Link>

            <Nav.Link
                className="custom-link"
                href="https://webstatic-sea.hoyolab.com/ys/app/interactive-map/index.html"
                target="_blank"
            >
                <img src={MapLogo} width="18px" height="100%" className="ms-1 me-2 mb-1" alt="mapLogo" />
                {t('Интерактивная карта')}
            </Nav.Link>

            <Nav.Link
                className="custom-link"
                href="https://genshin-impact.fandom.com/"
                target="_blank"
            >
                <img src={GenshinLogo} width="18px" height="100%" className="ms-1 me-2 mb-1" alt="genshinLogo" />
                Genshin Wiki
            </Nav.Link>
        </Nav>
    )
}