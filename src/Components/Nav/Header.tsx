import React, { useContext, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "../../Application";
import NavLinks from "./NavLinks";
import Search from '../Search/Search';

export default function Header() {
    const user = useContext(UserContext);
    const ref = useRef(null);
    const [header, setHeader] = useSpring(() => ({
        height: 80,
    }));

    useEffect(() => {
        const root = document.getElementById("application");
        function handleScroll() {
            if (!root) return;
            if (root.scrollTop > 50) {
                setHeader({
                    height: 80,
                });
            } else {
                setHeader({
                    height: 80,
                });
            }
        }

        root?.addEventListener("scroll", handleScroll);
        return () => {
            root?.removeEventListener("scroll", handleScroll);
        };
        //eslint-disable-next-line
    }, []);

    return (
        <StyledHeader style={header} ref={ref}>
            <HomeLink to="/" onClick={(e) => e.stopPropagation()}>
                pairboard.dev <sup>alpha</sup>
            </HomeLink>
            {user ? <Search /> : null}
            {user ? <NavLinks /> :
                <AuthButtons>
                    <button>Log In</button>
                    <button>Sign Up</button>
                </AuthButtons> }
        </StyledHeader>
    );
}

const StyledHeader = styled(animated.header)`
    z-index: 3;
    height: 80px;
    width: 100%;
    padding: 0 15%;
    background-color: ${(props) => props.theme.verydark};
    border-bottom: 7px solid ${(props) => props.theme.verydark};
    border-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.green}, ${props.theme.blue}, ${props.theme.purple}) 3`};
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 600px){
        padding: 2%;
    }
`;

const HomeLink = styled(Link)`
    height: 80px;
    background-color: transparent;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.4em;
    font-weight: 100;
    color: ${(props) => props.theme.light};
    transition: all 0.25s linear;
    text-decoration: none;
    outline: none;
    &:hover {
        transition: all 0.25s linear;
        font-size: 2.41em;
        color: ${(props) => props.theme.white};
    }
    > sup {
        background-color: transparent;
        color: ${(props) => props.theme.light};
        font-size: 0.5em;
    }
`;

const AuthButtons = styled.div`
    height: fit-content;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: space-between;
    > a:first-of-type {
        background-color: ${props => props.theme.dark};
        border-radius: 20px 0 0 20px;
        &:hover {
            box-shadow: -4px 0 10px ${props => props.theme.dark};
        }
    }
    > a:last-of-type {
        background-color: ${props => props.theme.green};
        border-radius: 0 20px 20px 0;
        &:hover {
            box-shadow: 4px 0 10px ${props => props.theme.green};
        }
    }
    > a {
        width: 100px;
        padding: 10px;        
        color: ${props => props.theme.white};
        text-align: center;
        text-decoration: none;
        font-size: 0.9em;
    }
`;