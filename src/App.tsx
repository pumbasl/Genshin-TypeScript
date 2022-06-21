import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import './i18n';
import './style/scss/mainStyle.scss';
import ErrorBoundary from './errors/ErrorBoundary';
import { Toaster } from 'react-hot-toast';
import { Background, CookieNotify, Wrapper, Alert as Alerts, ScrollUp } from './components';
import Header from './layout/Header/Header';
import Main from './layout/Main/Main';
import Footer from './layout/Footer/Footer';

export default function App(){
    return(
        <ErrorBoundary>
            <Background />
            <Toaster />
            <CookieNotify />
            <ScrollUp />
            
            <Alerts.War />
            <Alerts.Transfer />

            <Wrapper>
                <BrowserRouter>
                    <Header />
                    <Main />
                    <Footer />
                </BrowserRouter>
            </Wrapper>
        </ErrorBoundary>
    );
}