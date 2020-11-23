import React, { useContext, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "../../Application";
import ProfileLink from "./ProfileLink";
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
            {user ? <ProfileLink user={user} /> : null}
        </StyledHeader>
    );
}

const StyledHeader = styled(animated.header)`
    z-index: 3;
    position: fixed;
    height: 80px;
    width: 100%;
    margin-bottom: 40px;
    padding: 0 10%;
    background-color: ${(props) => props.theme.verydark};
    border-bottom: 5px solid ${(props) => props.theme.verydark};
    border-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue}) 3`};
    display: flex;
    justify-content: space-between;
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
