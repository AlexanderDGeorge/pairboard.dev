import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ModalContext } from '../../Application';
import { PostSchema } from '../../firebase/schema';
import ExpandedPost from './ExpandedPost';
import PostDate from './PostDate';
import PostTag from './PostTag';

export default function SmallPostCard(props: { post: PostSchema }) {
    const { title, host, description, difficulty, language, start } = props.post;
    const { handleModal } = useContext(ModalContext)!;

    function handleClick(e: React.SyntheticEvent) {
        e.stopPropagation();
        handleModal(<ExpandedPost post={props.post}/>);
    }

    return (
        <StyledSmallPostCard onClick={handleClick}>
            <div>
                <h3>{title}</h3>
                <StyledHostDiv to={`/user/${host.username}`}>
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

const StyledSmallPostCard = styled.div`
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
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 10px ${props => props.theme.verylight};
    }
    > div {
        display: flex;
        flex-direction: column;
    }
    `;

const StyledHostDiv = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    > img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
`;