import React from 'react';

//router
import { Link } from 'react-router-dom';
//

//style
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
//

//locales
import { useTranslation } from 'react-i18next';
//

//redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogout } from '../../store/thunks/userThunks';
//

export default function ProfileButtons(props){
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);

    const handleLogout = () => {
        dispatch(fetchLogout());
    };

    if(!token){
        return(
            <ButtonGroup className="dropDown-custom ms-1 me-2">
                <Button as={Link} to="/auth/login" variant="dark-custom">
                    {t('Авторизация')}
                </Button>
    
                <Button as={Link} to="/auth/reg" variant="dark-custom">
                    {t('Создать профиль')}
                </Button>
            </ButtonGroup>
        );
    } else {
        return(
            <Dropdown {...props}>
                <Dropdown.Toggle variant="dark-custom">
                {t('Профиль')}
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark" className="me-1">
                    <Dropdown.Item as={Link} to="/profile">{t('Личный кабинет')}</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/profile/settings">{t('Настройки')}</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>{t('Выйти')}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}