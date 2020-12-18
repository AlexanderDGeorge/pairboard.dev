import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CurrentDevContext } from '../../Application';
import NavLinks from './NavLinks';
import ProfileNav from './ProfileNav';
import logo from '../../Assets/PB.png';

export default function Header() {
    const dev = useContext(CurrentDevContext);

    return (
        <StyledHeader>
            <HomeLink to="/" onClick={(e) => e.stopPropagation()}>
                <img src={logo} alt="" />
            </HomeLink>
            {dev ? (
                <>
                    <NavLinks />
                    <ProfileNav />
                </>
            ) : (
                <AuthButtons>
                    <Link to="/login">Log In</Link>
                    <Link to="/signup">Sign Up</Link>
                </AuthButtons>
            )}
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    z-index: 3;
    height: 100px;
    width: 100%;
    padding: 0 15%;
    background-color: ${(props) => props.theme.verydark};
    border-bottom: 7px solid ${(props) => props.theme.verydark};
    border-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.green}, ${props.theme.blue}, ${props.theme.purple}) 3`};
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
    border: 2px solid ${(props) => props.theme.accent};
    border-radius: 10px;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.4em;
    font-weight: 100;
    color: ${(props) => props.theme.white};
    transition: all 0.25s linear;
    text-decoration: none;
    outline: none;
    > img {
        height: 60%;
        width: auto;
    }
    &:hover {
        border: 2px solid ${(props) => props.theme.white};
        box-shadow: 0 0 20px -8px;
    }
`;

const AuthButtons = styled.div`
    height: fit-content;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: space-between;
    > a:first-of-type {
        background-color: ${(props) => props.theme.dark};
        border-radius: 20px 0 0 20px;
        &:hover {
            box-shadow: -4px 0 10px ${(props) => props.theme.dark};
        }
    }
    > a:last-of-type {
        background-color: ${(props) => props.theme.green};
        border-radius: 0 20px 20px 0;
        &:hover {
            box-shadow: 4px 0 10px ${(props) => props.theme.green};
        }
    }
    > a {
        width: 100px;
        padding: 10px;
        color: ${(props) => props.theme.white};
        text-align: center;
        text-decoration: none;
        font-size: 0.9em;
    }
`;
