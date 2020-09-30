import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router";
import ProfileHeader from "../Profile/ProfileHeader";

export default () => {
    return (
        <Profile>
            <Switch>
                <Route path="/profile" component={ProfileHeader} />
            </Switch>
        </Profile>
    );
};

const Profile = styled.div`
    min-height: 100%;
    height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.white};
`;
