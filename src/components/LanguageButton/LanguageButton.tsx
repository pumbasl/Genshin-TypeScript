import React from 'react';
import { Dropdown, Image } from "react-bootstrap";
import { DropDirection } from 'react-bootstrap/esm/DropdownContext';
import { useTranslation } from 'react-i18next';
import { Earth, UaFlag, GbFlag, RuFlag } from '../../media';

interface IProps {
    className: string;
    drop: DropDirection;
};

function LanguageButton(props: IProps){
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string, hrefLang: string) => {
        i18n.changeLanguage(lng);
        document.documentElement.lang = hrefLang;
        localStorage.setItem('i18nextLng', lng);
        localStorage.setItem('hrefLang', hrefLang);
    };

    document.documentElement.lang = localStorage.getItem('hrefLang') || 'en';

    return(
        <Dropdown {...props}>
            <Dropdown.Toggle variant="purple" className="me-2">
                <Image src={Earth} width="20px" height="100%" alt="languageLogo" style={{paddingBottom: 1}} />
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">

                <Dropdown.Item as="button" onClick={() => changeLanguage('uk-UA', 'uk')}>
                    <img src={UaFlag} width='15px' height="100%" alt='UAFLAG' className='me-2' />
                    Українська
                </Dropdown.Item>

                <Dropdown.Item as="button" onClick={() => changeLanguage('ru-RU', 'ru')}>
                    <img src={RuFlag} width='15px' height="100%" alt='RUFLAG' className='me-2' />
                    Русский
                </Dropdown.Item>

                <Dropdown.Item as="button" onClick={() => changeLanguage('en-US', 'en')}>
                    <img src={GbFlag} width='15px' height="100%" alt='GBFLAG' className='me-2' />
                    English
                </Dropdown.Item>
                
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default React.memo(LanguageButton);