import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GenreList from './List';

export const Genre: React.FC = () => {
    return (
        <Switch>
            <Route path="/main/genre" component={GenreList} />
            {/* <Route
                exact
                path="/admin/service/create"
                component={ServiceCreate}
            /> */}
        </Switch>
    );
};
