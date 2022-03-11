import React from 'react';
import { Dropdown, Image } from "react-bootstrap";

// Locales
import { useTranslation } from 'react-i18next';
//

//Pictures
import { Earth } from '../../media';
//

export default function LanguageButton(props){
    const { i18n } = useTranslation();
    const changeLanguage = (lng, hrefLang) => {
        i18n.changeLanguage(lng);
        document.documentElement.lang = hrefLang;
        localStorage.setItem('i18nextLng', lng);
        localStorage.setItem('hrefLang', hrefLang);
    };

    document.documentElement.lang = localStorage.getItem('hrefLang') ? localStorage.getItem('hrefLang') : 'en';

    return(
        <Dropdown {...props}>
            <Dropdown.Toggle variant="purple" className="me-2">
                <Image src={Earth} width="20px" height="100%" alt="languageLogo" style={{paddingBottom: 1}} />
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">

                <Dropdown.Item as="button" onClick={() => changeLanguage('ru-RU', 'ru')}>
                    Русский
                </Dropdown.Item>

                <Dropdown.Item as="button" onClick={() => changeLanguage('en-US', 'en')}>
                    English
                </Dropdown.Item>

                <Dropdown.Item as="button" onClick={() => changeLanguage('de', 'de')}>
                    Deutsch
                </Dropdown.Item>

                <Dropdown.Item as="button" onClick={() => changeLanguage('fr-FR', 'fr')}>
                    Français
                </Dropdown.Item>

                <Dropdown.Item as="button" onClick={() => changeLanguage('ko', 'ko')}>
                    한국어
                </Dropdown.Item>

                <Dropdown.Item as="button" onClick={() => changeLanguage('zh-TW', 'zh')}>
                    中文（繁體）
                </Dropdown.Item>

                <Dropdown.Item as="button" onClick={() => changeLanguage('ja', 'ja')}>
                    日本語
                </Dropdown.Item>
                
            </Dropdown.Menu>
        </Dropdown>
    );
}