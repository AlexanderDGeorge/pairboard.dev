import React, { useContext } from "react";
import styled from "styled-components";
import { Post } from "../firebase/post";
import { Link } from "react-router-dom";
import { UserContext, ModalContext } from "../Application";

export default (props: { post: Post }) => {
    const {
        userId,
        username,
        userScore,
        userPhotoURL,
        language,
        difficulty,
        tags,
        description,
    } = props.post;

    const { uid } = useContext(UserContext)!;
    const { handleModal } = useContext(ModalContext)!;

    async function handleClick() {
        if (uid === userId) return;
        console.log("clicked");
        handleModal(<div></div>);
        // await createRoom();
        // create a confirm and then loading modal
    }

    return (
        <StyledPost onClick={handleClick}>
            <PostHeader>
                <img src={userPhotoURL} alt="" />
                <Link
                    to={uid === userId ? `/profile/stats` : `/user/${username}`}
                >
                    {username} | {userScore}
                </Link>
                <h4>{language}</h4>
            </PostHeader>
            <PostDescription>{description}</PostDescription>
            <PostInfo>
                <p>{difficulty}</p>
                {tags.map((tag, i: number) => (
                    <p key={i}>| {tag} </p>
                ))}
            </PostInfo>
        </StyledPost>
    );
};

const StyledPost = styled.div`
    height: 200px;
    width: 300px;
    margin-right: 10px;
    border: 1px solid ${(props) => props.theme.verydark};
    padding: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    transition: all linear 0.2s;
    &:hover {
        transition: all linear 0.2s;
        border: 1px solid ${(props) => props.theme.accent};
        box-shadow: 0 0 20px -8px ${(props) => props.theme.verydark};
    }
`;

const PostHeader = styled.div`
    height: 50px;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    > img {
        height: 100%;
        width: auto;
        margin-right: 10px;
    }
    > a {
        width: 200px;
        font-size: 1em;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
    > h4 {
        font-weight: 500;
    }
`;

const PostDescription = styled.div`
    height: 100px;
    width: 100%;
    margin-bottom: 10px;
    color: ${(props) => props.theme.medium};
`;

const PostInfo = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    > p {
        margin-right: 5px;
    }
`;
