import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LightUserSchema } from '../../firebase/schema';

export default function SmallUserCard(props: { user: LightUserSchema }) {
    const { photoURL, username, name } = props.user;

    return (
        <StyledSmallUserCard to={`/user/${username}`}>
            <img src={photoURL} alt="profile" />
            <div>
                <h3>{username}</h3>
                <h4>{name}</h4>
            </div>
        </StyledSmallUserCard>
    )
}

const StyledSmallUserCard = styled(Link)`
    width: 100%;
    max-width: 400px;
    margin-bottom: 5px;
    border-radius: 10px;
    padding: 5px;
    background-color: ${props => props.theme.white};
    overflow: hidden;
    display: flex;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    > img {
        height: 50px;
        width: 50px;
        margin-right: 10px;
        border: 1px solid ${props => props.theme.medium};
        border-radius: 50%;
    }
    > div {
        display: flex;
        flex-direction: column;
        > h4 {
            font-weight: 100;
            text-decoration: none !important;
        }
    }
`;