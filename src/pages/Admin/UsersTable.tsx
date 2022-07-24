import React, { useState } from 'react';
import { IUserinfo } from '../../types';
import { Table, Button } from 'react-bootstrap';
import Search from './SearchComponents';
import { useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import ActionUswerModal from './Modals/ActionUserModal';

export default function UsersTable(){
    const { t } = useTranslation();
    const users = useAppSelector((state) => state.admin.users);
    const [ showModal, setShowModal ] = useState(false);
    const [ dataModal, setDataModal ] = useState<IUserinfo | null>(null);
    

    const handleClick = (user: IUserinfo) => {
        setShowModal(true);
        setDataModal(user);
    };

    const handleClose = () => setShowModal(false);

    const tableRender = (user: IUserinfo, index: number) => {
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