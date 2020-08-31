import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext, SessionContext, ModalContext } from "./Application";
import Header from "./Nav/Header";
import Footer from "./Nav/Footer";
import LandingPage from "./Pages/Landing";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Loading from "./Pages/Loading";
import User from "./Pages/User";
import Pairs from "./Pages/Pairs";
import Home from "./Pages/Home";

export default function Routing() {
    const currentUser = useContext(UserContext);
    const session = useContext(SessionContext);
    const modalContext = useContext(ModalContext);

    console.log(currentUser);
    console.log(session);

    if (currentUser && modalContext) {
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/profile" component={Profile} />
                    <Route path="/user" component={User} />
                    <Route path="/pairs" component={Pairs} />
                    <Route path="/" component={Home} />
                </Switch>
                <Footer />
            </BrowserRouter>
        );
    } else if (currentUser === null && modalContext) {
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/" component={LandingPage} />
                </Switch>
                <Footer />
            </BrowserRouter>
        );
    } else {
        return (
            <BrowserRouter>
                <Header />
                <Loading />
                <Footer />
            </BrowserRouter>
        );
    }
}
