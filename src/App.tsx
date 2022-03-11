import React, { Suspense } from 'react';

//router
import { BrowserRouter as Router } from 'react-router-dom';
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
import { Background, Notifications, CookieNotify } from './components';
//

//layout
import Header from './layout/Header/Header';
import Main from './layout/Main/Main';
import Footer from './layout/Footer/Footer';
//

//alerts push
import { getTokenCheck, onMessageListener } from './config/firebase';
//

//notify
import { toast } from 'react-hot-toast';
//

//alerts
getTokenCheck(); // проверка токена

onMessageListener().then(payload => {
    toast(payload.notification.body, { duration: 8000 }); //уведомление
    console.log(payload); // вывод уведомления в консоль
}).catch(err => console.log('failed: ', err));
//

export default function App(){
    return(
        <ErrorBoundary>
            <Background />
            <Suspense fallback={<></>}>
                <Notifications />
                <CookieNotify />

                <Wrapper>
                    <Router>
                        <Header />
                        <Main />
                        <Footer />
                    </Router>
                </Wrapper>
            </Suspense>
        </ErrorBoundary>
    );
}