import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../Application';
import { PostSchema } from '../../firebase/schema';
import PostDate from './PostDate';
import { Link } from 'react-router-dom';
import ExpandedPost from './ExpandedPost';
import PostTag from './PostTag';
import { StyledCard } from '../../styled-components/StyledCard';

export default function Post(props: { post: PostSchema }) {
    const { description, host, language, title, type, start } = props.post;
    const { handleModal } = useContext(ModalContext)!;

    function handleClick(e: React.SyntheticEvent) {
        e.stopPropagation();
        handleModal(<ExpandedPost post={props.post} />);
    }

    return (
        <StyledPost onClick={handleClick}>
            <Header>
                <h2>{title.slice(0, 28)}</h2>
                <Link
                    onClick={(e) => e.stopPropagation()}
                    to={`/user/${host.username}`}
                >
                    <img src={host.photoURL} alt="" />
                    {host.username}
                </Link>
            </Header>
            <PostDate start={start} />
            <Tags>
                <PostTag tag={language} />
                <PostTag tag={type} />
            </Tags>
            <p>{description}</p>
        </StyledPost>
    );
}

const StyledPost = styled(StyledCard)`
    display: grid;
    grid-template-columns: max-content 5px 100px;
    grid-template-rows: 70px 5px auto;
    grid-template-areas:
        'title . date'
        '. . .'
        'description . tags';
    > p {
        height: 100%;
        width: 100%;
        max-width: 300px;
        grid-area: description;
        text-align: justify;
        overflow-y: auto;
    }
`;

const Header = styled.header`
    grid-area: title;
    min-height: 70px;
    height: 100%;
    width: 100%;
    max-width: 330px;
    display: flex;
    flex-direction: column;
    > h2 {
        font-weight: 500;
        overflow: hidden;
    }
    > a {
        height: 30px;
        display: flex;
        align-items: center;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
        > img {
            height: 100%;
            width: auto;
            margin-right: 10px;
            border-radius: 50%;
        }
    }
`;

const Tags = styled.div`
    grid-area: tags;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    list-style: none;
`;
