import React from "react";
import styled from "styled-components";
import { handleAuth } from "../firebase/auth";

export default function LandingPage() {
    return (
        <LandingContainer>
            <header>Header</header>
            <div>Landing Page</div>
            <button onClick={handleAuth}>Log in with Github</button>
            <footer>Footer</footer>
        </LandingContainer>
    );
}

const LandingContainer = styled.div`
    height: 100%;
    width: 100%;
    > header,
    footer {
        min-height: 100px;
        height: 10%;
        width: 100%;
    }
`;
