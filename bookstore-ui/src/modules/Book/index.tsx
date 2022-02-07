import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BookList from './List';

export const Book: React.FC = () => {
    return (
        <Switch>
            <Route path="/main/book" component={BookList} />
            {/* <Route
                exact
                path="/admin/service/create"
                component={ServiceCreate}
            /> */}
        </Switch>
    );
};
