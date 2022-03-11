import React from 'react';
import { Table } from 'react-bootstrap';

//componentns
import { TimeView } from '..';
//

//locales
import { useTranslation } from 'react-i18next';
//

export default function TableWithInfo({ data }){
    const { t } = useTranslation();

    return(
        <Table>
            <tbody>
                <tr>
                    <td>{t('Логин')}: </td>
                    <td>{data.login}</td>
                </tr>
                <tr>
                    <td>{t('Игровой ник')}: </td>
                    <td>{data?.gameInfo?.gameNickName}</td>
                </tr>
                <tr>
                    <td>{t('Ранг приключений')}:  </td>
                    <td>{data?.gameInfo?.adventureLvl}</td>
                </tr>
                <tr>
                    <td>{t('Ваш мейн персонаж')}: </td>
                    <td>{data?.gameInfo?.mainChar}</td>
                </tr>
                <tr>
                    <td>{t('Статус')}: </td>
                    <td>{t(data.roles)}</td>
                </tr>
                <tr>
                    <td>{t('Дата регистрации')}: </td>
                    <td>
                        <TimeView time={data.reg} />
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}