import React from 'react';
import { Route, Switch } from 'react-router';
import Overview from './Overview';
import Profile from './ProfileContainer';
import Account from './Account';
import Notifications from './Notifications';
import Teams from './Teams';

export default function SettingsRouter() {
    return (
        <Switch>
            <Route path='/settings/profile' component={Profile}/>
            <Route path='/settings/account' component={Account}/>
            <Route path='/settings/notifications' component={Notifications}/>
            <Route path='/settings/teams' component={Teams}/>
            <Route path='/settings' component={Overview} />
        </Switch>
    )
}