import React from "react";
import styled from "styled-components";
import Router from "../Components/Settings/Router";
import Nav from "../Components/Settings/Nav";

export default function SettingsPage() {
    return (
        <StyledSettingsPage>
            <div>
                <Nav />
                <Router />
            </div>
        </StyledSettingsPage>
    );
}

const StyledSettingsPage = styled.div`
    height: 100%;
    width: 100%;
    padding: 100px 10%;
    background-color: ${props => props.theme.verylight};
    > div {
        height: 100%;
        width: 100%;
        border: 1px solid ${props => props.theme.accent};
        border-radius: 10px;
        background-color: ${props => props.theme.white};
        display: flex;
        overflow: hidden;
    }
`;
