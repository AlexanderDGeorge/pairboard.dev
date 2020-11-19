import React, { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../../Application";
import { PostSchema } from "../../firebase/schema";
import PostDate from "./PostDate";
import { Link } from "react-router-dom";
import PostSelectModal from './ExpandedPost';
import PostTag from './PostTag';

export default function Post(props: { post: PostSchema }) {
    const {
        description,
        host,
        language,
        title,
        type,
        eventStart,
        eventEnd,
    } = props.post;
    const { handleModal } = useContext(ModalContext)!;

    async function handleClick(e: React.SyntheticEvent) {
        e.stopPropagation();
        handleModal(<PostSelectModal post={props.post}/>);
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
            <PostDate eventStart={eventStart}/>
            <Tags>
                <PostTag tag={language} />
                <PostTag tag={type} />
            </Tags>
            <p>{description}</p>
        </StyledPost>
    );
}

const StyledPost = styled.div`
    height: 200px;
    margin: 0 20px 20px 0;
    border: 1px solid ${(props) => props.theme.accent};
    border-radius: 15px;
    padding: 10px;
    box-shadow: 0 0 20px -12px ${(props) => props.theme.verydark};
    cursor: pointer;
    transition: all linear 0.2s;
    display: grid;
    grid-template-columns: max-content 10px 100px;
    grid-template-rows: 70px 10px auto;
    grid-template-areas:
        "title . date"
        ". . ."
        "description . tags";
    * {
        background: transparent;
    }
    &:hover {
        transition: all linear 0.2s;
        border-radius: 5px;
        box-shadow: 0 0 20px -6px ${(props) => props.theme.verydark};
    }
    &:active {
        box-shadow: inset 0 0 20px 2px ${(props) => props.theme.verydark};
    }
    > p {
        height: 100%;
        width: 100%;
        max-width: 300px;
        grid-area: description;
        font-weight: 200;
        text-align: justify;
        overflow-y: scroll;
    }
`;

const Header = styled.header`
    grid-area: title;
    min-height: 70px;
    height: 100%;
    width: 100%;
    max-width: 330px;
    width: 100%;
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
