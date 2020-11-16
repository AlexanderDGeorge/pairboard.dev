import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserSchema } from '../../firebase/schema';

interface IUserHit {
    blurb: UserSchema['blurb']
    connections: UserSchema['connections']
    photoURL: UserSchema['photoURL']
    username: UserSchema['username']
}

export default function UserHit(props: { hit: IUserHit} ) {
    const { hit } = props;
    
    console.log(hit);

    return (
        <StyledUserHit to={`users/${hit.username}`}>
            <img src={hit.photoURL} alt=""/>
            {hit.username}
        </StyledUserHit>
    )
}

const StyledUserHit = styled(Link)`
    display: flex;
    border: 1px solid ${props => props.theme.accent};
    img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
`;