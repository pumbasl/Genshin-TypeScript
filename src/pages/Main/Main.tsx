import React from 'react';
import { Container, PromoCodes, WebEvents, EventsCarousel } from '../../components';
import ErrorBoundary from '../../errors/ErrorBoundary';

export default function Main(){
    document.title = 'Genshin Promo | Main';
    
    return(
        <Container>
            <EventsCarousel />
            
            <ErrorBoundary>
                <WebEvents />
            </ErrorBoundary>

            <ErrorBoundary>
                <PromoCodes />
            </ErrorBoundary>
        </Container>
    );
}