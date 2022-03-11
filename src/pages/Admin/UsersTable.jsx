import React, { useState, useEffect } from 'react';

//components
import { Table, Button } from 'react-bootstrap';
import Search from './SearchComponents';
//

//redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminAllUsers } from '../../store/thunks/adminThunks';
//

// Locales
import { useTranslation } from 'react-i18next';
//

//modals
import ActionUswerModal from './Modals/ActionUserModal';
//

export default function UsersTable(){
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.admin.users);
    const [ showModal, setShowModal ] = useState(false);
    const [ dataModal, setDataModal ] = useState({});
    

    const handleClick = (user) => {
        setShowModal(true);
        setDataModal(user);
    };

    const handleClose = () => setShowModal(false);

    const tableRender = (user, index) => {
        return(
            <tr key={user._id}>
                <td>{++index}</td>
                <td>{user.login}</td>
                <td>{t(user.roles)}</td>
                <td className="text-center">
                    <Button size="sm" variant="dark-custom" onClick={() => handleClick(user)}>
                        Изменить
                    </Button>
                </td>
            </tr>
        );
    };

    useEffect(() => {
        dispatch(fetchAdminAllUsers());
    }, [dispatch]);

    return(
        <>
            <ActionUswerModal show={showModal} close={handleClose} data={dataModal} />
            
            <div className="custom-border-bottom mb-2">
                Таблица пользователей
            </div>

            <Search />

            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Логин</th>
                        <th>Разрешение</th>
                        <th className="text-center">Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(tableRender)}
                </tbody>
            </Table>
        </>
    );
}