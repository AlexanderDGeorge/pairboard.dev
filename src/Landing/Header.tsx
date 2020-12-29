import React, { useContext } from 'react';
import styled from 'styled-components';
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
    position: absolute;
    top: 0;
    left: 0;
    height: 100px;
    width: 100%;
    padding: 0 15%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 1000px) {
        padding: 0 8%;
    }
    @media screen and (max-width: 600px) {
        padding: 0 2%;
    }
`;

const HomeLink = styled(Link)`
    min-height: 60px;
    height: 60px;
    min-width: 60px;
    width: 60px;
    margin-right: 20px;
    border-radius: 18px;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.4em;
    font-weight: 100;
    color: ${(props) => props.theme.white};
    box-shadow: 4px 4px 20px -4px ${(props) => props.theme.black};
    transition: all 0.25s linear;
    text-decoration: none;
    outline: none;
    > img {
        height: 60%;
        width: auto;
    }
    &:hover {
        box-shadow: 4px 4px 20px -12px ${(props) => props.theme.light};
    }
`;

const StyledSignIn = styled.button`
    min-height: 60px;
    height: 60px;
    border-radius: 18px;
    padding: 0 30px;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    background-color: ${(props) => props.theme.verydark};
    color: ${(props) => props.theme.white};
    box-shadow: 4px 4px 16px -4px ${(props) => props.theme.black};
    transition: all 0.25s linear;
    text-decoration: none;
    outline: none;
    &:hover {
        box-shadow: 4px 4px 20px -12px ${(props) => props.theme.light};
    }
`;
