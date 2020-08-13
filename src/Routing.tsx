import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "./Application";
import LandingPage from "./Pages/Landing";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import HomePage from "./Pages/Home";
import Profile from "./Pages/Profile";
import Loading from "./Pages/Loading";
import User from "./Pages/User";
import Pairs from "./Pages/Pairs";

export default function Routing() {
    const currentUser = useContext(UserContext);
    console.log(currentUser);

    if (currentUser) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/profile" component={Profile} />
                    <Route path="/user" component={User} />
                    <Route path="/pairs" component={Pairs} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </BrowserRouter>
        );
    } else if (currentUser === null) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/" component={LandingPage} />
                </Switch>
            </BrowserRouter>
        );
    } else {
        return (
            <BrowserRouter>
                <Loading />
            </BrowserRouter>
        );
    }
}
