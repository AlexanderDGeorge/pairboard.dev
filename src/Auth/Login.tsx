import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import LoginForm from "./LoginForm";

const buttonForm = {
    height: 80,
    width: 300,
    right: "55%",
};

const expandedForm = {
    height: 600,
    width: 1500,
    right: "20%",
};

export default () => {
    const AnimatedLogin = animated(Login);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useSpring(() => buttonForm);

    return (
        <AnimatedLogin
            onClick={() => {
                setForm(expandedForm);
                setOpen(true);
            }}
            style={form}
        >
            {open ? <LoginForm /> : <h1>login</h1>}
        </AnimatedLogin>
    );
};

const Login = styled.div`
    position: absolute;
    z-index: 1;
    max-height: 90%;
    max-width: 60%;
    box-shadow: 0 4px 15px -8px ${(props) => props.theme.black};
    transition: box-shadow 0.5s linear;
    &:hover {
        transition: box-shadow 0.5s linear;
        box-shadow: 0 4px 20px -4px ${(props) => props.theme.black};
    }
    > h1 {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 1.5em;
        /* background-image: ${(props) => props.theme.white};
        transition: all 0.3s ease-out;
        &:hover {
            transition: all 0.3s ease-in;
            color: ${(props) => props.theme.white};
            background-image: ${(props) =>
                `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow})`};
        } */
    }
`;
