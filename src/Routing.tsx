import React, { useContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { UserContext } from "./Application";
import LandingPage from "./Pages/Landing";
import HomePage from "./Pages/Home";
import Profile from "./Pages/Profile";
import Loading from "./Pages/Loading";
import User from "./Pages/User";

export default function Routing() {
    const currentUser = useContext(UserContext);
    console.log(currentUser);

    if (currentUser) {
        return (
            <BrowserRouter>
                <Route path="/profile" component={Profile} />
                <Route path="/user" component={User} />
                <Route exact path="/" component={HomePage} />
            </BrowserRouter>
        );
    } else if (currentUser === null) {
        return (
            <BrowserRouter>
                <LandingPage />
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
