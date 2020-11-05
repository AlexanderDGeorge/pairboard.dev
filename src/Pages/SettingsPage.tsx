import React from "react";
import styled from "styled-components";
import Router from "../Components/Settings/Router";
import Nav from "../Components/Settings/Nav";

export default function SettingsPage() {
    return (
        <StyledSettingsPage>
            <Nav />
            <Router />
        </StyledSettingsPage>
    );
}

const StyledSettingsPage = styled.div`
    height: 100%;
    width: 100%;
    padding: 100px 10%;
    display: flex;
    
`;
