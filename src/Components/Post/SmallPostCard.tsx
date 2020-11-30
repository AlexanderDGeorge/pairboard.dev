import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PostSchema } from '../../firebase/schema';
import PostDate from './PostDate';
import PostTag from './PostTag';

export default function SmallPostCard(props: { post: PostSchema }) {
    const { id, title, host, description, difficulty, language, start } = props.post;

    return (
        <StyledSmallPostCard to={`/post/${id}`}>
            <div>
                <h3>{title}</h3>
                <StyledHostDiv>
                    <img src={host.photoURL} alt=""/>
                    {host.username}
                </StyledHostDiv>
                <p>{description}</p>
            </div>
            <div>
                <PostDate start={start}/>
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
    justify-content: space-between;
    text-decoration: none;
    &:hover {
        box-shadow: 0 0 10px ${props => props.theme.verylight};
    }
    > div {
        display: flex;
        flex-direction: column;
    }
    `;

const StyledHostDiv = styled.div`
    display: flex;
    align-items: center;
    > img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
`;