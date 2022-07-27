import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import './i18n';
import './style/scss/mainStyle.scss';
import ErrorBoundary from './errors/ErrorBoundary';
import { Toaster } from 'react-hot-toast';
import { Background, CookieNotify, Wrapper, Alerts, ScrollUp } from './components';
import Layout from './layout';

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
                    <Layout />
                </BrowserRouter>
            </Wrapper>
        </ErrorBoundary>
    );
}