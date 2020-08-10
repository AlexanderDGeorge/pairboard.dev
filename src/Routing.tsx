import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./Pages/Landing";
import HomePage from "./Pages/Home";
import { useUserContext } from "./State/UserContext";
import Nav from "./Nav/Nav";

export default function Routing() {
    const currentUser = useUserContext();
    console.log(currentUser);

    if (currentUser) {
        return (
            <BrowserRouter>
                <Nav />
                <Route path="/" component={HomePage} />
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
