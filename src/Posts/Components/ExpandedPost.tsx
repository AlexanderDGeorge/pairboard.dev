import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ModalContext } from '../../Application';
import useLockBodyScroll from '../../util/useLockBodyScroll';
import useOnOutsideCLick from '../../util/useOnOutsideClick';
import PostTag from './PostTag';
import PostSubscribe from './PostSubscribe';
import PostDate from './PostDate';
import { PostSchema } from '../postSchema';

export default function ExpandedPost(props: { post: PostSchema }) {
    const modalRef = useRef(null);
    const { handleModal } = useContext(ModalContext)!;
    const {
        title,
        description,
        created_by,
        type,
        language,
        start_date,
    } = props.post;

    useOnOutsideCLick(modalRef, () => handleModal());
    useLockBodyScroll();

    return (
        <StyledModal ref={modalRef}>
            <h1>{title}</h1>
            <PostDate start={start_date} expanded />
            <Tags>
                <PostTag tag={language} />
                <PostTag tag={type} />
            </Tags>
            <Link to={`/user/${created_by.username}`}>
                <img src={created_by.image_url} alt="" />
                <h4>{created_by.username}</h4>
            </Link>
            <p>{description}</p>
            <StyledDivider />
            <PostSubscribe post={props.post} />
        </StyledModal>
    );
}

const StyledModal = styled.div`
    position: relative;
    width: 600px;
    border-radius: 5px;
    padding: 2%;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.white};
    cursor: auto;
    overflow-y: auto;
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
        text-align: justify;
    }
    > a {
        height: 50px;
        width: 50%;
        margin-bottom: 10px;
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
    margin: 10px 0;
    overflow-x: auto;
    display: flex;
    > p {
        margin-top: 0;
        margin-right: 10px;
    }
`;

const StyledDivider = styled.div`
    height: 0;
    margin: 20px 10%;
    border-bottom: 1px solid ${(props) => props.theme.accent};
`;
