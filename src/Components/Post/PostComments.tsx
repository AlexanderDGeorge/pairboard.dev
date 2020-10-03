import React from "react";
import styled from "styled-components";
import { PostSchema } from "../../firebase/schema";

export default (props: { post: PostSchema }) => {
    const { comments } = props.post;
    return (
        <PostComments>
            {comments.map((comment, i) => (
                <Comment>
                    {comment.comment}
                    {comment.user.photoURL}
                    {comment.user.username}
                    {comment.user.score}
                </Comment>
            ))}
        </PostComments>
    );
};

const PostComments = styled.div``;

const Comment = styled.div``;
