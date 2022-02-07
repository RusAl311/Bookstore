import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthorList from './List';

export const Author: React.FC = () => {
    return (
        <Switch>
            <Route path="/main/author" component={AuthorList} />
            {/* <Route
                exact
                path="/admin/service/create"
                component={ServiceCreate}
            /> */}
        </Switch>
    );
};
