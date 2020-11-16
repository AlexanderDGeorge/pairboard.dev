import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function DropdownItem(props: {icon: JSX.Element, path: string, name: string}) {
    const { icon, path, name } = props;

    return (
        <StyledDropdownItem to={`/${path}`}>
            {icon}
            {name}
        </StyledDropdownItem>
    )
}

const StyledDropdownItem = styled(Link)`
    height: 40px;
    width: 100%;
    border-radius: 10px;
    padding: 5px;
    display: flex;
    align-items: center;
    color: ${props => props.theme.light};
    fill: ${props => props.theme.light};
    text-decoration: none;
    transition: all 0s;
    &:hover {
        transition: all 0s;
        color: ${props => props.theme.white};
        fill: ${props => props.theme.white};
        background-color: ${props => props.theme.medium};
    }
    > svg {
        height: 100%;
        width: auto;
        margin-right: 10px;
        fill: inherit;
        background: transparent;
    }
`;