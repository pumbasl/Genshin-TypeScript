import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from "react-bootstrap";
import { MapLogo, WikiLogo, NewsIcon } from '../../media';
import { useTranslation } from 'react-i18next';

export default function Subfields(){
    const { t } = useTranslation();
    return(
        <Nav className="me-auto">
            <Nav.Link
                className="custom-link"
                as={NavLink}
                to="/news"
            >
                <img src={NewsIcon} width="18px" height="100%" className="ms-1 me-2 mb-1" alt="newsLogo" />
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
                href="https://wiki.hoyolab.com/"
                target="_blank"
            >
                <img src={WikiLogo} width="18px" height="100%" className="ms-1 me-2 mb-1" alt="hoyoWIKI" />
                HoYoWiki
            </Nav.Link>
        </Nav>
    )
}