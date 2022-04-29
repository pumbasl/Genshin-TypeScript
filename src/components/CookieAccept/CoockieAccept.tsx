import React from 'react';
import { Button, Container } from 'react-bootstrap';
import styled from 'styled-components';
import useLocalStorage from '../../hooks/useLocalStorage';

// Locales
import { useTranslation } from 'react-i18next';
//

//style
const CoockieContainer = styled.div`
    position: fixed;
    bottom: 0;
    background-color: rgba(255, 255, 255, .9);
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    z-index: 999;
`;

export default function Cookie(){
    const [ show, setShow ] = useLocalStorage('cookie', true);
    const [ t ] = useTranslation();

    if(!show) return null;

    return(
        <CoockieContainer>
            <Container>
                <p><b>{t('cookie')}</b></p>
                <div className="text-right">
                    <Button onClick={() => setShow(false)}>
                        {t('Закрыть')}
                    </Button>
                </div>
            </Container>
        </CoockieContainer>
    );
}