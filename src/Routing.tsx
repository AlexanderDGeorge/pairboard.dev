import React, { useContext, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CurrentDevContext } from './Application';
import Header from './Components/Nav/Header';
import Footer from './Components/Nav/Footer';
import LandingPage from './Pages/LandingPage';
import LoadingPage from './Pages/LoadingPage';
import Modal from './Components/Modal/Modal';

const ProfilePage = lazy(() => import('./Pages/ProfilePage'));
const HomePage = lazy(() => import('./Pages/HomePage'));
const RoomPage = lazy(() => import('./Pages/RoomPage'));
const MessagesPage = lazy(() => import('./Pages/MessagesPage'));
const SettingsPage = lazy(() => import('./Pages/SettingsPage'));
const TeamPage = lazy(() => import('./Pages/TeamPage'));

export default function Routing() {
    const currentDev = useContext(CurrentDevContext);
    // console.log(currentDev);

    if (currentDev) {
        if (currentDev.roomId) {
            return (
                <Suspense fallback={<LoadingPage />}>
                    <RoomPage roomId={currentDev.roomId} />
                </Suspense>
            );
        }
        return (
            <BrowserRouter>
                <Header />
                <Modal />
                <Suspense fallback={<LoadingPage />}>
                    <Switch>
                        <Route path="/teams" component={TeamPage} />
                        <Route path="/settings" component={SettingsPage} />
                        <Route path="/messages" component={MessagesPage} />
                        <Route path="/dev/:username" component={ProfilePage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </Suspense>
                <Footer />
            </BrowserRouter>
        );
    } else if (currentDev === null) {
        return (
            <BrowserRouter>
                <Modal />
                <LandingPage />
                <Footer />
            </BrowserRouter>
        );
    } else {
        return (
            <BrowserRouter>
                <LoadingPage />
            </BrowserRouter>
        );
    }
}
