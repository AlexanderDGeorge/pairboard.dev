import React, { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../../Application";
import { PostSchema } from "../../firebase/schema";
import PostDate from "./PostDate";
import { Link } from "react-router-dom";
import { StyledCard } from "../../styled-components/StyledCard";
import PostSelectModal from './PostSelectModal';
import PostTag from './PostTag';

export default function Post(props: { post: PostSchema }) {
    const {
        description,
        host,
        language,
        title,
        type,
        sessionDate,
        sessionEnd,
        sessionStart,
    } = props.post;
    const { handleModal } = useContext(ModalContext)!;

    async function handleClick(e: React.SyntheticEvent) {
        e.stopPropagation();
        handleModal(<PostSelectModal />);
    }

    return (
        <StyledPost onClick={handleClick}>
            <Header>
                <img src={host.photoURL} alt="" />
                <div>
                    <h2>{title}</h2>
                    <h4>{sessionStart} - {sessionEnd}</h4>
                    <Link
                        onClick={(e) => e.stopPropagation()}
                        to={`/user/${host.username}`}
                    >
                        {host.username}
                    </Link>
                </div>
            </Header>
            <PostDate sessionDate={sessionDate}/>
            <Tags>
                <PostTag tag={language} />
                <PostTag tag={type} />
            </Tags>
            <p>{description}</p>
        </StyledPost>
    );
}

const StyledPost = styled(StyledCard)`
    width: max-content;
    display: grid !important;
    grid-template-columns: auto 10px 100px;
    grid-template-rows: 70px 10px auto;
    grid-template-areas:
        "header . date"
        ". . ."
        "description . tags";
    > p {
        height: 100%;
        width: 100%;
        grid-area: description;
        font-weight: 200;
        text-align: justify;
        overflow-y: scroll;
    }
`;

const Header = styled.header`
    grid-area: header;
    min-height: 70px;
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

const Tags = styled.div`
    grid-area: tags;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    list-style: none;
`;
