import React, { useContext, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "./Application";
import Header from "./Components/Nav/Header";
import Footer from "./Components/Nav/Footer";
import LandingPage from "./Pages/LandingPage";
import LoadingPage from "./Pages/LoadingPage";
import Modal from "./Components/Modal/Modal";

const SignupPage = lazy(() => import('./Pages/SignupPage'));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const UserPage = lazy(() => import("./Pages/UserPage"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const RoomPage = lazy(() => import("./Pages/RoomPage"));
const MessagesPage = lazy(() => import("./Pages/MessagesPage"));
const SettingsPage = lazy(() => import("./Pages/SettingsPage"));

export default function Routing() {
    const currentUser = useContext(UserContext);

    if (currentUser) {
        if (currentUser.status === "in room") {
            return (
                <Suspense fallback={<LoadingPage />}>
                    <RoomPage />
                </Suspense>
            )
        }
        return (
            <BrowserRouter>
                <Header />
                <Modal />
                <Suspense fallback={<LoadingPage />}>
                    <Switch>
                        <Route path="/settings" component={SettingsPage} />
                        <Route path="/messages" component={MessagesPage} />
                        <Route
                            exact
                            path="/user"
                            render={() => <UserPage user={currentUser} />}
                            />
                        <Route path="/user/:username" component={UserPage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </Suspense>
                <Footer />
            </BrowserRouter>
        );
    } else if (currentUser === null) {
        return (
            <BrowserRouter>
                <Header />
                <Modal />
                <Suspense fallback={<LoadingPage />}>
                    <Switch>
                        <Route path="/signup" component={SignupPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/" component={LandingPage} />
                    </Switch>
                </Suspense>
                <Footer />
            </BrowserRouter>
        );
    } else {
        return (
            <BrowserRouter>
                <Header />
                <Modal />
                <LoadingPage />
                <Footer />
            </BrowserRouter>
        );
    }
}
