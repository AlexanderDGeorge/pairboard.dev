import React, { useContext } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router";
import Edit from "../Components/Profile/Edit";
import { UserContext } from "../Application";
import Info from "../Components/Profile/Info";
import Posts from "../Components/Profile/Posts";
import Settings from "../Components/Profile/Settings";

export default () => {
    const user = useContext(UserContext)!;

    return (
        <ProfilePage>
            <Info user={user} />
            <Switch>
                <Route path="/profile/settings" component={Settings} />
                <Route path="/profile/edit" component={Edit} />
                <Route path="/profile" component={Posts} />
            </Switch>
        </ProfilePage>
    );
};

const ProfilePage = styled.div`
    min-height: 100%;
    width: 100%;
    padding: 2% 5%;
    display: flex;
    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`;
