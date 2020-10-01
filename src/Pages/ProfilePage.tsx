import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router";
import ProfileMain from "../Profile/ProfileMain";

export default () => {
    return (
        <Profile>
            <Switch>
                <Route path="/profile" component={ProfileMain} />
            </Switch>
        </Profile>
    );
};

const Profile = styled.div`
    min-height: 100%;
    height: 100%;
    width: 100%;
    padding: 2% 5%;
    display: flex;
    background-color: ${(props) => props.theme.white};
`;
