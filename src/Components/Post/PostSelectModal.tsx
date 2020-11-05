import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ModalContext } from '../../Application';
import { PostSchema } from '../../firebase/schema';
import { StyledButton, StyledButtonRow, StyledCancelButton } from '../../styled-components/StyledButtons';
import useLockBodyScroll from '../../util/useLockBodyScroll';
import useOnOutsideCLick from '../../util/useOnOutsideClick';
import PostTag from './PostTag';

export default function PostSelectModal(props: {post: PostSchema}) {
    const modalRef = useRef(null);
    const { handleModal } = useContext(ModalContext)!;
    const { title, description, host, type, language, sessionDate } = props.post;

    useOnOutsideCLick(modalRef, () => handleModal());
    useLockBodyScroll();

    function canJoin() {
        const now = new Date();
        console.log(now);
        const then = new Date(sessionDate);
        console.log(then);
        console.log(then === now);
        return false;
    }

    return (
        <StyledModal ref={modalRef}>
            <h1>{title}</h1>
            <Tags>
                <PostTag tag={language} />
                <PostTag tag={type} />
            </Tags>
            <Link to={`/user/${host.username}`}>
                <img src={host.photoURL} alt="" />
                <h4>{host.username}</h4>
            </Link>
            <p>{description}</p>
            <StyledDivider />
            <StyledButtonRow>
                <StyledCancelButton onClick={() => handleModal()}>Cancel</StyledCancelButton>
                <StyledButton disabled={canJoin()}>
                    Join Room
                </StyledButton>
            </StyledButtonRow>
        </StyledModal>
    )
}

const StyledModal = styled.div`
    height: 60%;
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
    > a {
        height: 50px;
        margin-bottom: 20px;
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
    > p {
        font-weight: 100;
        text-align: justify;
    }
`;

const Tags = styled.div`
    width: 100%;
    overflow-x: scroll;
    display: flex;
`;

const StyledDivider = styled.div`
    height: 0;
    margin: 20px;
    border-bottom: 1px solid ${props => props.theme.accent};
`;