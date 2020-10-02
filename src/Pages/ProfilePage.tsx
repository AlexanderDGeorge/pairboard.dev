import React, { useContext } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router";
import Edit from "../Profile/Edit";
import { UserContext } from "../Application";
import Info from "../Profile/Info";
import Posts from "../Profile/Posts";
import Settings from "../Profile/Settings";

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
    height: 100%;
    width: 100%;
    padding: 2% 5%;
    display: flex;
    background-color: ${(props) => props.theme.white};
`;
