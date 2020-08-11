import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./Pages/Landing";
import HomePage from "./Pages/Home";
import Profile from "./Pages/Profile";
import { useUserContext } from "./State/UserContext";

export default function Routing() {
    const currentUser = useUserContext();
    console.log(currentUser);

    if (currentUser) {
        return (
            <BrowserRouter>
                <Route path="/profile" component={Profile} />
                <Route exact path="/" component={HomePage} />
            </BrowserRouter>
        );
    } else {
        return (
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
    }
}
