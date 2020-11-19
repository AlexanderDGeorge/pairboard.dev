import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PostSchema } from '../../firebase/schema';

interface IPostHit {
    id: PostSchema['id'];
    host: PostSchema['host'];
    description: PostSchema['description'];
    eventEnd: PostSchema['eventEnd'];
    eventStart: PostSchema['eventStart'];
    language: PostSchema['language'];
    title: PostSchema['title'];
    type: PostSchema['type'];
}

export default function PostHit(props: {hit: IPostHit}) {
    const { hit } = props;

    return (
        <StyledPostHit to={`/post/${hit.id}`}>
            {hit.title}
        </StyledPostHit>
    )
}

const StyledPostHit = styled(Link)`
    border-top: 1px solid ${props => props.theme.accent};
    padding: 5px;
    display: flex;
    align-items: center;
    background: transparent;
    color: ${props => props.theme.white};
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;