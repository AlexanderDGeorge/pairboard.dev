import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ModalContext } from '../../Application';
import { PostSchema } from '../../firebase/schema';
import useLockBodyScroll from '../../util/useLockBodyScroll';
import useOnOutsideCLick from '../../util/useOnOutsideClick';
import PostTag from './PostTag';
import PostSubscribe from './PostSubscribe';
import ExpandedPostDate from './ExpandedPostDate';


export default function ExpandedPost(props: {post: PostSchema}) {
    const modalRef = useRef(null);
    const { handleModal } = useContext(ModalContext)!;
    const { title, description, host, type, language, eventStart } = props.post;

    useOnOutsideCLick(modalRef, () => handleModal());
    useLockBodyScroll();

    return (
        <StyledModal ref={modalRef}>
            <h1>{title}</h1>
            <Tags>
                <PostTag tag={language} />
                <PostTag tag={type} />
            </Tags>
            <LinkDateRow>
                <Link to={`/user/${host.username}`}>
                    <img src={host.photoURL} alt="" />
                    <h4>{host.username}</h4>
                </Link>
                <ExpandedPostDate eventStart={eventStart}/>
            </LinkDateRow>
            <p>{description}</p>
            <StyledDivider />
            <PostSubscribe post={props.post} />
        </StyledModal>
    )
}

const StyledModal = styled.div`
    position: relative;
    max-height: 600px;
    width: 60%;
    max-width: 800px;
    border-radius: 5px;
    padding: 4%;
    display: flex;
    flex-direction: column;
    cursor: auto;
    overflow-y: scroll;
    > h1 {
        margin-bottom: 5px;
        font-weight: 800;
        font-size: 3em;
        background: ${(props) =>
            `linear-gradient(140deg, ${props.theme.green}, ${props.theme.blue})`};
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        overflow: auto;
    }
    > p {
        font-weight: 100;
        text-align: justify;
    }
`;

const LinkDateRow = styled.div`
    height: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    > a {
        height: 100%;
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
    width: 100%;
    overflow-x: scroll;
    display: flex;
`;

const StyledDivider = styled.div`
    height: 0;
    margin: 20px 10%;
    border-bottom: 1px solid ${props => props.theme.accent};
`;