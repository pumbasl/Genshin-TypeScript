import React, { Suspense } from 'react';

//router
import { BrowserRouter } from 'react-router-dom';
//

//locales
import './i18n';
//

//styles
import './style/scss/mainStyle.scss';
import { Wrapper } from './style/style';
//

//Предохранитель
import ErrorBoundary from './errors/ErrorBoundary';
//

//components
import { Toaster } from 'react-hot-toast';
import { Background, CookieNotify } from './components';
//

//layout
import Header from './layout/Header/Header';
import Main from './layout/Main/Main';
import Footer from './layout/Footer/Footer';
//

export default function App(){
    return(
        <ErrorBoundary>
            <Background />
            <Suspense fallback={<></>}>
                <Toaster />
                <CookieNotify />

                <Wrapper>
                    <BrowserRouter>
                        <Header />
                        <Main />
                        <Footer />
                    </BrowserRouter>
                </Wrapper>
            </Suspense>
        </ErrorBoundary>
    );
}