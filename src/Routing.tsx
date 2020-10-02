import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "./Application";
import Header from "./Components/Nav/Header";
import Footer from "./Components/Nav/Footer";
import LandingPage from "./Pages/LandingPage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import LoadingPage from "./Pages/LoadingPage";
import UserPage from "./Pages/UserPage";
import HomePage from "./Pages/HomePage";
import RoomPage from "./Pages/RoomPage";
import MessagesPage from "./Pages/MessagesPage";

export default function Routing() {
    const currentUser = useContext(UserContext);

    if (currentUser) {
        if (currentUser.status === "in room") {
            return <RoomPage />;
        }
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/messages" component={MessagesPage} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/user" component={UserPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
                <Footer />
            </BrowserRouter>
        );
    } else if (currentUser === null) {
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/" component={LandingPage} />
                </Switch>
                <Footer />
            </BrowserRouter>
        );
    } else {
        return (
            <BrowserRouter>
                <Header />
                <LoadingPage />
                <Footer />
            </BrowserRouter>
        );
    }
}
