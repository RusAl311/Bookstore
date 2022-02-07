import './AppLayout.less';

import React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import routes from '../../configs/routes';
import { Login } from '../../modules/Login';

export const LoginLayout: React.FC<RouteComponentProps> = ({ children }) => {
    const getRoutes = (routes: any[]) => {
        return routes.map((key) => {
            return <Route path="/auth/login" component={Login} key={key} />;
        });
    };
    return (
        <>
            {children}
            <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/auth/login" />
            </Switch>
        </>
    );
};
