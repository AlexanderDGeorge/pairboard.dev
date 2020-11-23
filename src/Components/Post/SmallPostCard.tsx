import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LitePostSchema } from '../../firebase/schema';
import PostDate from './PostDate';
import PostTag from './PostTag';

export default function SmallPostCard(props: { post: LitePostSchema }) {
    const { id, title, description, difficulty, language, eventStart } = props.post;

    return (
        <StyledSmallPostCard to={`/post/${id}`}>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div>
                <PostDate eventStart={eventStart}/>
                <PostTag tag={difficulty}/>
                <PostTag tag={language}/>
            </div>
        </StyledSmallPostCard>
    )
}

const StyledSmallPostCard = styled(Link)`
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
    > div {
        display: flex;
        flex-direction: column;
    }
`;