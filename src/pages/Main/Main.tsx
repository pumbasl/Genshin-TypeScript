import React from 'react';
import { Container, PromoCodes, WebEvents } from '../../components';
import ErrorBoundary from '../../errors/ErrorBoundary';

export default function Main(){
    document.title = 'Genshin Promo | Main';
    
    return(
        <Container>
            <ErrorBoundary>
                <WebEvents />
            </ErrorBoundary>

            <ErrorBoundary>
                <PromoCodes />
            </ErrorBoundary>
        </Container>
    );
}