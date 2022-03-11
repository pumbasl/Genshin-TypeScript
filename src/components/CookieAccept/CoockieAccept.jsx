import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

//style
import { CoockieContainer } from "../../style/style";
//

// Locales
import { useTranslation } from 'react-i18next';
//

export default function Cookie(){
    const [ show, setShow ] = useState(false);
    const [ t ] = useTranslation();
    const handleClick = () => {
        localStorage.setItem('cookie', 'true');
        setShow(false)
    };

    if(!localStorage.getItem('cookie') && !show){
        setShow(true);
    }

    return(
        show 
        ? (<CoockieContainer>
                <Container>
                    <p><b>{t('cookie')}</b></p>
                    <div className="text-right">
                        <Button onClick={handleClick}>
                            {t('Закрыть')}
                        </Button>
                    </div>
                </Container>
            </CoockieContainer>)
        : (null)
    );
}