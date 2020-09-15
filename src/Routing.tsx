import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext, SessionContext } from "./Application";
import Header from "./Components/Nav/Header";
import Footer from "./Components/Nav/Footer";
import LandingPage from "./Pages/Landing";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Loading from "./Pages/Loading";
import User from "./Pages/User";
import Pairs from "./Pages/Pairs";
import Home from "./Pages/Home";
import Session from "./Pages/Session";

export default function Routing() {
    const currentUser = useContext(UserContext);
    const session = useContext(SessionContext);

    // console.log(currentUser);
    // console.log(session);

    if (session?.users?.length && session?.users?.length > 1) {
        return (
            <BrowserRouter>
                <Header />
                <Session />
                <Footer />
            </BrowserRouter>
        );
    } else if (currentUser) {
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
    } else if (currentUser === null) {
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
        return <Loading />;
    }
}
