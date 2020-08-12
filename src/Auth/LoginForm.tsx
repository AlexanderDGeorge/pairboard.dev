import React, { useState } from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import { handleAuth } from "../firebase/auth";

export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <LoginForm>
            <h1>Login</h1>
            <button onClick={handleAuth}>
                Log in with Github <FaGithub />
            </button>

            <label htmlFor="email">Email</label>
            <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button>Log in</button>
        </LoginForm>
    );
};

const LoginForm = styled.div`
    padding: 5%;
    display: flex;
    flex-direction: column;
    > label {
        margin-top: 20px;
        margin-bottom: 5px;
        font-weight: 100;
    }
    > input {
        width: 100%;
        padding: 10px;
        border: 1px solid ${(props) => props.theme.accent};
        font-size: 1em;
        outline: none;
    }
    > button {
        width: 100%;
        padding: 10px;
        border: 1px solid ${(props) => props.theme.accent};
        margin-top: 43px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1em;
        cursor: pointer;
        background-color: ${(props) => props.theme.white};
        color: ${(props) => props.theme.verydark};
        transition: all 0.2s linear;
        &:hover {
            color: ${(props) => props.theme.white};
            transition: all 0.2s linear;
            background-color: ${(props) => props.theme.verydark};
        }
        > svg {
            height: 100%;
            width: auto;
            margin: 0 10px;
            background-color: transparent;
            fill: ${(props) => props.theme.accent};
        }
    }
`;
