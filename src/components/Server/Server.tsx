import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchChangeServer } from '../../store/thunks/userThunks';
import { userSlice } from '../../store/reducers/userSlice';
import { Dropdown } from 'react-bootstrap';
import { IServer } from '../../types';

const setServer = userSlice.actions.setServer;
const serverList = ['Europe', 'America', 'Asia'];

interface ServerProps{
    className: string;
};

export default function Server(props: ServerProps){
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const server = useAppSelector((state) => state.user.server);

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if(server === event.currentTarget.value) return;

        localStorage.setItem('server', event.currentTarget.value);
        if(localStorage.getItem('token')){
            dispatch(fetchChangeServer({ server: event.currentTarget.value} as IServer))
        } else {
            dispatch(setServer(event.currentTarget.value));
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