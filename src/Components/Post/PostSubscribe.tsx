import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext, UserContext } from '../../Application';
import { deletePost, joinPost } from '../../firebase/post';
import { PostSchema } from '../../firebase/schema';
import { StyledButton, StyledButtonRow, StyledCancelButton, StyledDeleteButton } from '../../styled-components/StyledButtons';

export default function PostSubscribe(props: { post: PostSchema }) {
    const { type, id, host } = props.post;
    const { uid } = useContext(UserContext)!;
    const { handleModal } = useContext(ModalContext)!;

    async function handleJoin() {
        handleModal();
        await joinPost(uid, id);
    }

    function handleDelete() {
        handleModal();
        deletePost(id);
    }

    return (
        <StyledPostSubscribe>
            {/* <h2>Notifications</h2>
            <p>Subscribe to receive important updates and notifications.</p>
            <p>When the event is live you may join.</p> */}
            <PostNotificationSettings />
            <StyledButtonRow>
                <StyledCancelButton onClick={() => handleModal()}>
                    Cancel
                </StyledCancelButton>
                <StyledButton onClick={handleJoin}>
                    Join this {type}
                </StyledButton>
                {host.uid === uid ? 
                    <StyledDeleteButton onClick={handleDelete}>
                        Delete
                    </StyledDeleteButton> : null
                }
            </StyledButtonRow>
        </StyledPostSubscribe>
    )
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
    )
}

const StyledNotificationSettings = styled.div`
    width: 100%;
`;