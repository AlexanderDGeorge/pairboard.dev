import React from 'react';
import { StyledNavItem } from '../../styled-components/StyledNav';
import { useLocation } from 'react-router-dom';

export default function NavItem(props: { title: string, path: string }) {
    const { title, path } = props;
    const pathname = useLocation().pathname;

    return (
        <StyledNavItem
            to={path}
            style={
                pathname.toLowerCase() === path.toLowerCase() ?
                    {} :
                    { borderLeft: '2px solid transparent' }
                }
        >
            {title}
        </StyledNavItem>
    )
}