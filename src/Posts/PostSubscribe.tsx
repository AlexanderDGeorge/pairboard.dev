import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext, CurrentDevContext } from '.././Application';
import useManagePost from './util/useManagePost';
import {
    StyledButton,
    StyledButtonRow,
    StyledCancelButton,
} from '../styled-components/StyledButtons';
import { PublicPostSchema } from './postSchema';

export default function PostSubscribe(props: { post: PublicPostSchema }) {
    const { type, id, created_by } = props.post;
    const { user } = useContext(CurrentDevContext)!;
    const { handleModal } = useContext(ModalContext)!;
    const { status, error, deletePost } = useManagePost();

    async function handleJoin() {
        handleModal();
        // await joinPost(user.uid, id);
    }

    return (
        <StyledPostSubscribe>
            <PostNotificationSettings />
            <StyledButtonRow>
                <StyledCancelButton onClick={() => handleModal()}>
                    Cancel
                </StyledCancelButton>
                <StyledButton onClick={handleJoin}>
                    Join this {type}
                </StyledButton>
            </StyledButtonRow>
        </StyledPostSubscribe>
    );
}

const StyledPostSubscribe = styled.div`
    width: 100%;
    > p {
        font-weight: 100;
    }
`;

function PostNotificationSettings() {
    return (
        <StyledNotificationSettings>
            Post Notifications Settings
        </StyledNotificationSettings>
    );
}

const StyledNotificationSettings = styled.div`
    width: 100%;
`;
