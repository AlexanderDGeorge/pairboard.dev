import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { StyledH1 } from '../styled-components/StyledHeadings';
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
        <Login ref={modalRef}>
            <StyledH1>Sign In</StyledH1>
            <StyledGithubButton onClick={loginWithGithub}>
                <FaGithub />
            </StyledGithubButton>
            <StyledHorDiv>
                <div></div>
                <h4>OR</h4>
                <div></div>
            </StyledHorDiv>
            <LoginForm />
            <Link style={{ marginTop: '10%' }} to="/signup">
                meant to sign up?
            </Link>
            <Link to="/password">forgot password?</Link>
        </Login>
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
        border-top: 1px solid ${(props) => props.theme.accent};
    }
    > h4 {
        min-height: 40px;
        height: 40px;
        min-width: 40px;
        width: 40px;
        padding: 5px;
        border-radius: 50%;
        background-color: ${(props) => props.theme.accent};
        color: ${(props) => props.theme.white};
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const Login = styled.div`
    min-width: 300px;
    width: 60%;
    max-width: 500px;
    border-radius: 18px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 5px 20px -4px ${(props) => props.theme.black};
    background: ${(props) =>
        `radial-gradient(${props.theme.white}, transparent)`};
    backdrop-filter: blur(8px);
    > form {
        width: 100%;
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
