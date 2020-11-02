import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function AccountNav() {
    const [current, setCurrent] = useState('Profile');

    return (
        <StyledAccountNav>
            <NavItem current={current} setCurrent={setCurrent} title='Overview'/>
            <NavItem current={current} setCurrent={setCurrent} title='Profile'/>
            <NavItem current={current} setCurrent={setCurrent} title='Account'/>
            <NavItem current={current} setCurrent={setCurrent} title='Email'/>
            <NavItem current={current} setCurrent={setCurrent} title='Notifications'/>
            <NavItem current={current} setCurrent={setCurrent} title='Teams'/>
        </StyledAccountNav>
    )
}

const StyledAccountNav = styled.nav`
    height: 100%;
    min-width: 200px;
    border: 1px solid ${props => props.theme.accent};
    border-radius: 5px;
    padding: 5px;
`;

function NavItem(props: { title: string, current: string, setCurrent: Function }) {
    const { title, current, setCurrent } = props;
    return (
        <StyledNavItem style={current === title ? {} : {borderLeft: '2px solid transparent'}} onClick={() => setCurrent(title)}to={`/settings/${title}`}>
            {props.title}
        </StyledNavItem>
    )
}

const StyledNavItem = styled(Link)`
    height: 40px;
    width: 100%;
    border-left: 2px solid ${props => props.theme.red};
    border-bottom: 1px solid ${props => props.theme.accent};
    padding: 5px;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.2s linear;
    &:hover {
        transition: all 0.2s linear;
        border-left: 2px solid ${props => props.theme.red} !important;
        background-color: ${props => props.theme.verylight};
    }
`;