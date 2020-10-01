import React, { useContext } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router";
import Profile from "../Profile/Profile";
import { UserContext } from "../Root";

export default () => {
    const user = useContext(UserContext)!;

    return (
        <ProfilePage>
            <Switch>
                <Route
                    path="/profile"
                    component={() => <Profile user={user} />}
                />
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
