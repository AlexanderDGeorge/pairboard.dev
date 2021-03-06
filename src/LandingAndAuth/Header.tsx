import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../Assets/PB.png';
import { ModalContext } from '../Application';
import LoginModal from './LoginModal';

export default function LandingHeader() {
    const { handleModal } = useContext(ModalContext)!;

    return (
        <StyledHeader>
            <HomeLink to="/" onClick={(e) => e.stopPropagation()}>
                <img src={logo} alt="" />
            </HomeLink>
            <StyledSignIn
                onClick={() => {
                    handleModal(<LoginModal />);
                }}
            >
                Sign In
            </StyledSignIn>
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
    * {
        z-index: inherit;
    }
`;

const sharedStyling = css`
    min-height: 60px;
    height: 60px;
    min-width: 60px;
    border-radius: 18px;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    background-color: ${(props) => props.theme.verydark};
    color: ${(props) => props.theme.white};
    box-shadow: 4px 4px 20px -4px ${(props) => props.theme.black};
    transition: all 0.25s linear;
    text-decoration: none;
    outline: none;
    > img {
        height: 60%;
        width: auto;
    }
`;

const HomeLink = styled(Link)`
    ${sharedStyling}
`;

const StyledSignIn = styled.button`
    ${sharedStyling};

    padding: 0 30px;
    &:hover {
        box-shadow: 4px 4px 20px -12px ${(props) => props.theme.light};
    }
`;
