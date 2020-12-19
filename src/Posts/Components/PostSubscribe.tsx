import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../Application';
import {
    StyledButton,
    StyledButtonRow,
    StyledCancelButton,
} from '../../styled-components/StyledButtons';
import { PostSchema } from '../postSchema';
import usePostSubscribe from '../util/usePostSubscribe';

export default function PostSubscribe(props: { post: PostSchema }) {
    const { type } = props.post;
    const { handleModal } = useContext(ModalContext)!;
    const { status, error, subscribed, toggleSubscription } = usePostSubscribe(
        props.post,
    );

    console.log(status, error);

    return (
        <StyledPostSubscribe>
            <PostNotificationSettings />
            <StyledButtonRow>
                <StyledCancelButton onClick={() => handleModal()}>
                    Cancel
                </StyledCancelButton>
                <StyledButton onClick={toggleSubscription}>
                    {subscribed
                        ? `Unsubscribe from this ${type}`
                        : `Subscribe to this ${type}`}
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
