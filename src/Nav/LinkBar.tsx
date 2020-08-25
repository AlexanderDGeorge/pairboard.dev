import React from "react";
import styled from "styled-components";
import StyledLink from "../styled-components/linkStyle";

export default () => {
    return (
        <LinkBar>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/search">Search</StyledLink>
            <StyledLink to="/pairs">Pairs</StyledLink>
            <StyledLink to="/profile/stats">Profile</StyledLink>
        </LinkBar>
    );
};

const LinkBar = styled.div`
    height: 60px;
    width: 100%;
    padding: 0 5%;
    background-color: ${(props) => props.theme.white};
    border-bottom: 1px solid ${(props) => props.theme.light};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
