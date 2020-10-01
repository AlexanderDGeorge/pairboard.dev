import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Components/Nav/Header";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import RoomPage from "./Pages/RoomPage";
import UserPage from "./Pages/UserPage";
import { UserContext } from "./Root";
import { GlobalStyle } from "./styled-components/globalStyle";

declare global {
    interface Window {
        [key: string]: any;
    }
}

export default () => {
    const user = useContext(UserContext);

    if (!user) {
        // [TODO]: add error
        return null;
    } else if (user.status === "in room") {
        return <RoomPage />;
    } else {
        return (
            <BrowserRouter>
                <GlobalStyle />
                <Header />
                <Switch>
                    <Route path="/user/:username" component={UserPage} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </BrowserRouter>
        );
    }
};
