import React from "react";
import { Route, Switch } from "react-router";
import Nav from "./Nav";
import Edit from "../Profile/Edit";

export default function Router() {
    return (
        <>
            <Nav />
            <Switch>
                <Route path="/edit" component={Edit} />
            </Switch>
        </>
    );
}
