import React, { Suspense, lazy } from 'react';

//components
import { Preloader } from '../components';
//

//router
import { Routes, Route } from 'react-router-dom';
//

//statis pages
import Main from '../pages/Main/Main';
import Error from '../errors/error';
//

//lazy pages
const Policy = lazy(() => import('../pages/Policy/Policy'));
const Help = lazy(() => import('../pages/Help/Help'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Registration = lazy(() => import('../pages/Auth/Registration'));
// const RestorePassword = lazy(() => import('../pages/Auth/RestorePassword'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const News = lazy(() => import('../pages/News/News'));
const Settings = lazy(() => import('../pages/Profile/Settings/Settings'));
const Admin = lazy(() => import('../pages/Admin/Admin'));

//

export default function Routers(){
    return(
        <Suspense fallback={<Preloader fetch />}>
            <Routes>
                <Route exact path="/" element={<Main />} />
                <Route exact path="policy" element={<Policy />} />
                <Route exact path="help" element={<Help />} />
                <Route exact path="news" element={<News />} />

                <Route exact path="auth/login" element={<Login />} />
                <Route exact path="auth/reg" element={<Registration />} />
                {/* <Route exact path="/auth/restore_password" element={<RestorePassword />} /> */}

                <Route exact path="profile" element={<Profile />} />
                <Route exact path="profile/settings" element={<Settings />} />

                <Route exact path="admin" element={<Admin />} />

                <Route exact path="*" element={<Error id="404" />} />
            </Routes>
        </Suspense>
    );
}