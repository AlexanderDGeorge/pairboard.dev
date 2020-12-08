import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../Application';

export default function ProfileLink() {
    const { username, photoURL } = useContext(UserContext)!;

    return (
        <StyledProfileLink to={`/user/${username}`}>
            <img src={photoURL} alt=""/>
        </StyledProfileLink>
    )
}

const StyledProfileLink = styled(Link)`
    height: 100%;
    width: 60px;
    padding: 6px;
    background-color: ${props => props.theme.verydark};
    transition: all 0.25s linear;
    &:hover {
        transition: all 0.25s linear;
        background: transparent;
    }
    > img {
        height: 100%;
        width: auto;
        border-radius: 50%;
    }
`;