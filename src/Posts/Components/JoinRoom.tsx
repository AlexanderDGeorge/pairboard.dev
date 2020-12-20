import React, { useContext } from 'react';
import styled from 'styled-components';
import { CurrentDevContext } from '../../Application';
import { functions } from '../../firebase';
import { StyledButton } from '../../styled-components/StyledButtons';
import { PostSchema } from '../postSchema';

const joinPostRoom = functions.httpsCallable('joinPostRoom');

export default function JoinRoom(props: { post: PostSchema }) {
    const { profile } = useContext(CurrentDevContext)!;

    async function handleJoin() {
        await joinPostRoom({ profile, postId: props.post.id });
    }

    return (
        <StyledJoinRoom>
            <StyledButton onClick={() => handleJoin()}>Join Room</StyledButton>
        </StyledJoinRoom>
    );
}

const StyledJoinRoom = styled.div`
    width: 100%;
`;
