import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

export default function AccountNav() {
    const pathname = useLocation().pathname.slice(10);

    return (
        <StyledAccountNav>
            <NavItem pathname={pathname} title='Overview'/>
            <NavItem pathname={pathname} title='Profile'/>
            <NavItem pathname={pathname} title='Account'/>
            <NavItem pathname={pathname} title='Notifications'/>
            <NavItem pathname={pathname} title='Teams'/>
        </StyledAccountNav>
    )
}

const StyledAccountNav = styled.nav`
    height: 100%;
    min-width: 200px;
    border-right: 1px solid ${props => props.theme.accent};
    padding: 10px;
`;

function NavItem(props: { title: string, pathname: string }) {
    const { title, pathname } = props;
    return (
        <StyledNavItem
            style={
                pathname.toLowerCase() === title.toLowerCase() ?
                    {} :
                    { borderLeft: '2px solid transparent' }} to={`/settings/${title.toLowerCase()}`
            }
        >
            {props.title}
        </StyledNavItem>
    )
}

const StyledNavItem = styled(Link)`
    height: 40px;
    width: 100%;
    border-left: 4px solid ${props => props.theme.green};
    border-bottom: 1px solid ${props => props.theme.accent};
    padding: 5px;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.2s linear;
    &:hover {
        transition: all 0.2s linear;
        border-left: 4px solid ${props => props.theme.green} !important;
        background-color: ${props => props.theme.light};
    }
`;