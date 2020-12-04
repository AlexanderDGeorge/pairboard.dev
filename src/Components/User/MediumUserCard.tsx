import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LightUserSchema } from '../../firebase/schema';

export default function MediumUserCard(props: { user: LightUserSchema }) {
    const { photoURL, username, name } = props.user;

    return (
        <StyledMediumUserCard to={`/user/${username}`}>
            <img src={photoURL} alt="profile" />
            <StyledInfoPane>
                <h3>{username}</h3>
                <h4>{name}</h4>
            </StyledInfoPane>
            
        </StyledMediumUserCard>
    )
}

const StyledMediumUserCard = styled(Link)`
    width: 100%;
    margin-bottom: 5px;
    border-radius: 10px;
    background-color: ${props => props.theme.white};
    overflow: hidden;
    display: flex;
    text-decoration: none;
    &:hover {
        box-shadow: 0 0 10px ${props => props.theme.verylight};
    }
    > img {
        height: 50px;
        width: 50px;
        margin-right: 10px;
        border-right: 1px solid ${props => props.theme.medium};
    }
`;

const StyledInfoPane = styled.div`
    width: 100%;
    max-width: 500px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    > h3 {
        display: flex;
        font-weight: 500;
        color: transparent;
        background: ${(props) =>
            `linear-gradient(45deg, ${props.theme.green}, ${props.theme.blue})`};
        background-clip: text;
        -webkit-background-clip: text;
    }
    > * {
        margin-bottom: 5px;
    }
`;