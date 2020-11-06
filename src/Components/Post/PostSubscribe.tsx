import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ModalContext, UserContext } from '../../Application';
import { joinPost } from '../../firebase/post';
import { PostSchema } from '../../firebase/schema';
import { StyledButton, StyledButtonRow, StyledCancelButton } from '../../styled-components/StyledButtons';
import LoadingBar from '../Animated/LoadingBar';


export default function PostSubscribe(props: { post: PostSchema }) {
    const [loading, setLoading] = useState(false);
    const { type, id } = props.post;
    const { uid } = useContext(UserContext)!;
    const { handleModal } = useContext(ModalContext)!;

    async function handleJoin() {
        setLoading(true);
        await joinPost(uid, id);
        setLoading(false);
    }

    return (
        <StyledPostSubscribe>
            <h2>Notifications</h2>
            <p>Subscribe to receive important updates and notifications.</p>
            <p>When the event is live you may join.</p>
            <PostNotificationSettings />
            <StyledButtonRow>
                <StyledCancelButton onClick={() => handleModal()}>
                    Cancel
                </StyledCancelButton>
                <StyledButton onClick={handleJoin} disabled={loading}>
                    {loading ? <LoadingBar /> : `Join this ${type}`}
                </StyledButton>
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