import React, { useContext, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CurrentDevContext } from './Application';
import Header from './Components/Nav/Header';
import Footer from './Components/Nav/Footer';
import LandingPage from './Pages/LandingPage';
import LoadingPage from './Pages/LoadingPage';
import Modal from './Components/Modal/Modal';
import styled from 'styled-components';

const SignupPage = lazy(() => import('./Pages/SignupPage'));
const LoginPage = lazy(() => import('./Pages/LoginPage'));
const ProfilePage = lazy(() => import('./Pages/ProfilePage'));
const HomePage = lazy(() => import('./Pages/HomePage'));
const RoomPage = lazy(() => import('./Pages/RoomPage'));
const MessagesPage = lazy(() => import('./Pages/MessagesPage'));
const SettingsPage = lazy(() => import('./Pages/SettingsPage'));
const TeamPage = lazy(() => import('./Pages/TeamPage'));

export default function Routing() {
    const currentDev = useContext(CurrentDevContext);

    if (currentDev) {
        // if (currentDev.status === 'in room') {
        //     return (
        //         <Suspense fallback={<LoadingPage />}>
        //             <RoomPage />
        //         </Suspense>
        //     );
        // }
        return (
            <BrowserRouter>
                <Header />
                <Modal />
                <StyledPage>
                    <Suspense fallback={<LoadingPage />}>
                        <Switch>
                            <Route path="/teams" component={TeamPage} />
                            <Route path="/settings" component={SettingsPage} />
                            <Route path="/messages" component={MessagesPage} />
                            {/* <Route
                                exact
                                path="/user"
                                render={() => <ProfilePage user={currentDev} />}
                            /> */}
                            <Route
                                path="/user/:username"
                                component={ProfilePage}
                            />
                            <Route path="/" component={HomePage} />
                        </Switch>
                    </Suspense>
                </StyledPage>
                <Footer />
            </BrowserRouter>
        );
    } else if (currentDev === null) {
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

const StyledPage = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding: 2% 15%;
    background-color: ${(props) => props.theme.verylight};
    @media screen and (max-width: 600px) {
        padding: 2%;
    }
`;
