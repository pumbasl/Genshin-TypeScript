import React from 'react';

// Locales
import { useTranslation } from 'react-i18next';
//

//redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangeServer } from '../../store/thunks/userThunks';
import { setServer } from '../../store/actions/userActions';
//

//styles
import { Dropdown } from 'react-bootstrap';
//

const serverList = ['Europe', 'America', 'Asia'];

export default function Server(props){
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const server = useSelector((state) => state.user.server);

    const handleClick = async (event) => {
        if(server === event.target.value) return;

        localStorage.setItem('server', event.target.value);
        if(localStorage.getItem('token')){
            dispatch(fetchChangeServer(event.target.value))
        } else {
            dispatch(setServer(event.target.value));
        }
    };

    const ChangeServer = () => (
        <Dropdown.Menu variant="dark" className="me-1">
            <Dropdown.Item as="button" onClick={handleClick} value={serverList[0]} active={ server === serverList[0] ? (true) : (false) }>
                Europe
            </Dropdown.Item>

            <Dropdown.Item as="button" onClick={handleClick} value={serverList[1]} active={ server === serverList[1] ? (true) : (false) }>
                America
            </Dropdown.Item>

            <Dropdown.Item as="button" onClick={handleClick} value={serverList[2]} active={ server === serverList[2] ? (true) : (false) }>
                Asia
            </Dropdown.Item>
        </Dropdown.Menu>
    );
    
    return(
        <Dropdown {...props}>

            <Dropdown.Toggle variant="purple" id="dropdown-server">
                {t('Изменить сервер')}
            </Dropdown.Toggle>

            <ChangeServer />

        </Dropdown>
    );
}