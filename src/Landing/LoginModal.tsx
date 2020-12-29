import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import { FaGithub } from 'react-icons/fa';
import { StyledGithubButton } from '../styled-components/StyledButtons';
import useLogin from './util/useLogin';
import useOnOutsideCLick from '../util/useOnOutsideClick';
import { ModalContext } from '../Application';

export default function LoginModal() {
    const { handleModal } = useContext(ModalContext)!;
    const { loginWithGithub } = useLogin();
    const modalRef = useRef(null);
    useOnOutsideCLick(modalRef, () => handleModal());

    return (
        <>
            <StyledGithubButton onClick={loginWithGithub}>
                <FaGithub />
                Sign In with Github
            </StyledGithubButton>
            <StyledHorDiv>
                <div></div>
                <h4>OR</h4>
                <div></div>
            </StyledHorDiv>
            <LoginForm />
            <PlainLink>meant to sign up?</PlainLink>
            <PlainLink>forgot password?</PlainLink>
        </>
    );
}

export const StyledHorDiv = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    font-size: 1em;
    font-weight: 500;
    > div {
        width: 50%;
        border-top: 2px solid ${(props) => props.theme.dark};
    }
    > h4 {
        min-height: 40px;
        height: 40px;
        min-width: 40px;
        width: 40px;
        padding: 5px;
        border-radius: 50%;
        background-color: ${(props) => props.theme.dark};
        color: ${(props) => props.theme.white};
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const PlainLink = styled.button`
    color: ${(props) => props.theme.blue};
    text-decoration: none;
    background: transparent;
    font-size: 1em;
    padding: 10px;
    &:hover {
        text-decoration: underline;
    }
`;
