import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ModalContext } from '../../Application';
import useLockBodyScroll from '../../util/useLockBodyScroll';
import useOnOutsideCLick from '../../util/useOnOutsideClick';
import PostTag from './PostTag';
import PostSubscribe from './PostSubscribe';
import PostDate from './PostDate';
import JoinRoom from './JoinRoom';
import { PostSchema } from '../postSchema';
import { StyledH1 } from '../../styled-components/StyledHeadings';

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

    const now = new Date();
    const hasStarted = start_date <= now;

    console.log(hasStarted);

    useOnOutsideCLick(modalRef, () => handleModal());
    useLockBodyScroll();

    return (
        <>
            <StyledH1>{title}</StyledH1>
            <Tags>
                <PostTag tag={language} />
                <PostTag tag={type} />
            </Tags>
            <PostDate start={start_date} expanded />
            <StyledLink to={`/dev/${created_by.username}`}>
                <img src={created_by.image_url} alt="" />
                <h4>{created_by.username}</h4>
            </StyledLink>
            <p style={{ textAlign: 'justify' }}>{description}</p>
            <StyledDivider />
            {hasStarted ? (
                <JoinRoom post={props.post} />
            ) : (
                <PostSubscribe post={props.post} />
            )}
        </>
    );
}

const StyledLink = styled(Link)`
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
`;

const Tags = styled.div`
    width: 100%;
    overflow-x: auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const StyledDivider = styled.div`
    height: 0;
    margin: 20px 10%;
    border-bottom: 1px solid ${(props) => props.theme.accent};
`;
