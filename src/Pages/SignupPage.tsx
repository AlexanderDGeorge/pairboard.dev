import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SignupForm from "../Components/Auth/SignupForm";
import GithubSignupForm from "../Components/Auth/GithubSignupForm";

export default function SignupPage() {
    const [topError, setTopError] = useState<string | undefined>(undefined);

    return (
        <Signup>
            <h1>Signup</h1>
            <SignupForm topError={topError} setTopError={setTopError} />
            <span>
                <div></div>
                OR
                <div></div>
            </span>
            <GithubSignupForm setTopError={setTopError} />
            <Link style={{ marginTop: "10%" }} to="/login">
                meant to log in?
            </Link>
            <Link to="/password">forgot password?</Link>
        </Signup>
    );
}

const Signup = styled.div`
    min-height: 100%;
    width: 100%;
    padding: 2% 10%;
    display: flex;
    flex-direction: column;
    > span {
        width: 100%;
        max-width: 600px;
        margin: 5% 0;
        padding: 0 10%;
        display: flex;
        align-items: center;
        font-size: 1em;
        font-weight: 500;
        > div {
            width: 50%;
            border-top: 1px solid ${(props) => props.theme.verydark};
        }
    }
    > a {
        height: 50px;
        width: 100%;
        max-width: 600px;
        text-align: center;
        color: ${(props) => props.theme.blue};
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;
