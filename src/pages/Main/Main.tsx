import React from 'react';

//components
import { Container, PromoCodes, WebEvents } from '../../components';
//

export default function Main(){
    document.title = 'Genshin Promo | Main';
    return(
        <Container>
            <WebEvents />
            <PromoCodes />
        </Container>
    );
}