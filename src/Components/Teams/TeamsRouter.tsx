import React from "react";
import { Route, Switch } from "react-router";
import NewTeam from './NewTeam';

export default function MessagesRouter() {
    return (
        <Switch>
            <Route path='/' component={NewTeam}/>
        </Switch>
    );
}
