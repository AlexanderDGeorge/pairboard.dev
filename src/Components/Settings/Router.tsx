import React from 'react';
import { Route, Switch } from 'react-router';
import Overview from './Overview';
import Profile from './Profile';

export default function Router() {
    return (
        <Switch>
            <Route path='/settings/profile' component={Profile}/>
            <Route path='/settings' component={Overview} />
        </Switch>
    )
}