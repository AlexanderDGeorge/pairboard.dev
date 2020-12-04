import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LightUserSchema } from '../../firebase/schema';

export default function SmallUserCard(props: {user: LightUserSchema}) {
    const { photoURL, username } = props.user;
    return (
        <StyledSmallUserCard to={`/user/${username}`}>
            <img src={photoURL} alt="profile" />
            {username}
        </StyledSmallUserCard>
    )
}

const StyledSmallUserCard = styled(Link)`
    grid-area: host;
    height: 100%;
    max-height: 60px;
    margin-bottom: 5px;
    /* border: 1px solid ${props => props.theme.accent}; */
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    > img {
        height: 100%;
        width: auto;
        margin-right: 5px;
        border-right: 1px solid ${props => props.theme.accent};
    }
`;