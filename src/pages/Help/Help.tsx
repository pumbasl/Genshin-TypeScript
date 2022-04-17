import React from 'react';

import Container from '../../components/Container/Container';

export default function Help(){
    document.title = 'Genshin Promo | Help'; // TITLE PAGE

    return(
        <Container>
            <h1>Желаете помочь проекту?</h1>
            <p>Нам нужны люди в команду!</p>
            <ul>
                <li>Редакторы</li>
                <li>Переводчики</li>
                <li>Front End developer</li>
            </ul>
            <p>Связатся со мной Вы сможете по информации снизу!</p>
        </Container>
    );
}