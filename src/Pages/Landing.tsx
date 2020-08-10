import React from "react";
import styled from "styled-components";
import { handleAuth } from "../firebase/auth";
import Header from "../Nav/Header";

export default function LandingPage() {
    return (
        <LandingContainer>
            <Header />
            <section>
                <button onClick={handleAuth}>Sign In With Github</button>
            </section>
        </LandingContainer>
    );
}

const LandingContainer = styled.div`
    height: 100%;
    width: 100%;
    > section {
        height: 50%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        > button {
            height: 100px;
            width: 250px;
            border-radius: 10px;
            color: ${(props) => props.theme.verylight};
            background-color: ${(props) => props.theme.verydark};
            font-size: 1.5em;
            font-weight: 100;
            &:hover {
                color: ${(props) => props.theme.white};
                text-decoration: underline;
            }
        }
    }
`;
