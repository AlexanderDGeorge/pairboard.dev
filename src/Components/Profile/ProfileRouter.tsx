import React from "react";
import { Switch, Route } from "react-router";
import ProfileStats from "./ProfileStats";
import ProfileSettings from "./ProfileSettings";

export default () => {
    return (
        <Switch>
            <Route path="/profile/settings" component={ProfileSettings} />
            <Route path="/profile" component={ProfileStats} />
        </Switch>
    );
};
