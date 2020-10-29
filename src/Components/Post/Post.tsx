import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext, ModalContext } from "../../Application";
import { joinPost } from "../../firebase/post";
import { PostSchema } from "../../firebase/schema";
import PostExtras from "./PostExtras";
import { Link } from "react-router-dom";
import { StyledCard } from "../../styled-components/StyledCard";
import PasswordModal from "../Modal/PasswordModal";

export default function Post(props: { post: PostSchema }) {
    const {
        description,
        host,
        language,
        title,
        type,
        password,
        sessionDate,
        sessionEnd,
        sessionStart,
    } = props.post;
    const { handleModal } = useContext(ModalContext)!;
    const { uid } = useContext(UserContext)!;
    // const dateToNow = getDateToNow(new Date(createdAt));

    function handleJoin(input: string) {
        if (input === password) {
            joinPost(uid, props.post.id);
            handleModal();
        }
    }

    async function handleClick(e: React.SyntheticEvent) {
        e.stopPropagation();
        if (password) {
            handleModal(
                <PasswordModal
                    pText="This room requires a password"
                    submitCallback={handleJoin}
                />
            );
        } else {
            joinPost(uid, props.post.id);
        }
    }

    return (
        <StyledPost onClick={handleClick}>
            <Header>
                <img src={host.photoURL} alt="" />
                <div>
                    <h2>{title}</h2>
                    <Link
                        onClick={(e) => e.stopPropagation()}
                        to={`/user/${host.username}`}
                    >
                        {host.username}
                    </Link>
                </div>
            </Header>
            <Tags>
                <li>{type}</li>
                <li>{language}</li>
                <li>{sessionDate}</li>
                <li>{sessionStart}</li>
                <li>{sessionEnd}</li>
            </Tags>
            <p>{description}</p>
            <Footer post={props.post} />
        </StyledPost>
    );
}

const StyledPost = styled(StyledCard)`
    display: grid;
    grid-template-columns: 70% 30%;
    grid-template-rows: 30% 50% 20%;
    grid-template-areas:
        "header tags"
        "description tags"
        "footer footer";
    padding-bottom: 0;

    > p {
        grid-area: description;
        font-weight: 200;
        overflow-y: scroll;
    }
`;

const Header = styled.header`
    grid-area: header;
    height: 100%;
    width: 100%;
    display: flex;
    > img {
        height: 100%;
        width: auto;
        margin-right: 10px;
    }
    > div {
        display: flex;
        flex-direction: column;
        > h2 {
            font-weight: 500;
        }
        > a {
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }
`;

const Tags = styled.ul`
    grid-area: tags;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    list-style: none;
`;

const Footer = styled(PostExtras)`
    grid-area: footer;
    align-self: flex-end;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    font-weight: 100;
    font-size: 0.8em;
    > p {
        width: 100px;
    }
`;
