import './App.less';

import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';

import { AppLayout } from '../Layout/AppLayout';
import { LoginLayout } from '../Layout/LoginLayout';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route
                    path="/auth/"
                    render={(props) => <LoginLayout {...props} />}
                />
                <Route
                    path="/main/"
                    render={(props) => <AppLayout {...props} />}
                />
                <Redirect from={'/'} to={'/auth/login'} />
            </Switch>
        </Router>
    );
};

export default App;
