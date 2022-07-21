import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { List } from '../../components';
import { MAILLogo, TELEGRAMLogo } from '../../media';
import './style.scss';

const FooterCopyright = styled.div`
    text-align: center;
    font-weight: 300;
    font-size: 90%;
    margin-bottom: 10px;
`;

const FooterWrapper = styled.div({
    flex: '0 0 auto',
    backgroundColor: 'black',
    color: 'white'
});
//

export default function Footer(){
    const { t } = useTranslation();
    return(
        <FooterWrapper>
            <Container>
                <List.Container>
                    <List.Title>
                        {t('Карта сайта')}:
                        <List.Body>
                            <a href="/sitemap.xml" className="custom-link">
                                XML {t('карта')}
                            </a>
                        </List.Body>
                    </List.Title>

                    <List.Title>
                        {t('О нас')}:
                        <List.Body>
                            <Link to="/" className="custom-link">
                                {t('Главная')}
                            </Link>
                        </List.Body>

                        <List.Body>
                            <Link to="/help" className="custom-link">
                                {t('Помощь в проекте')}
                            </Link>
                        </List.Body>
                    </List.Title>

                    <List.Title>
                        {t('Информация')}:
                        <List.Body>
                            <Link to="/policy" className="custom-link">
                                {t('Условия использования')}
                            </Link>
                        </List.Body>
                    </List.Title>

                    <List.Title>
                        {t('Контакты')}:
                        <List.Body>
                            <a href="https://t.me/deniswiberg" className="custom-contact">
                                <img src={TELEGRAMLogo} width="30px" height="100%" alt="tglogo" />
                            </a>
                            <a href="mailto: pumbasl60@gmail.com" className="custom-contact">
                                <img src={MAILLogo} width="30px" height="100%" alt="maillogo" />
                            </a>
                        </List.Body>
                    </List.Title>
                </List.Container>
                <hr color='white' />
                <FooterCopyright>
                    {t('Genshin-promo.com не связан с miHoYo.')}<br />
                    {t('Genshin Impact, контент и материалы игры являются товарными знаками и принадлежат miHoYo.')} <br />
                    Copyright &copy; 2021-2022 Genshin-promo.com
                </FooterCopyright>
            </Container>
        </FooterWrapper>
    );
}