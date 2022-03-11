import React, { Suspense, lazy } from 'react';

//components
import { Preloader } from '../components';
//

//router
import { Switch, Route } from 'react-router-dom';
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
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/policy" component={Policy} />
                <Route exact path="/help" component={Help} />
                <Route exact path="/news" component={News} />

                <Route exact path="/auth/login" component={Login} />
                <Route exact path="/auth/reg" component={Registration} />
                {/* <Route exact path="/auth/restore_password" component={RestorePassword} /> */}

                <Route exact path="/profile" component={Profile} />
                <Route exact path="/profile/settings" component={Settings} />

                <Route exact path="/admin" component={Admin} />

                <Route exact path="*">
                    <Error id="404" />
                </Route>
            </Switch>
        </Suspense>
    );
}