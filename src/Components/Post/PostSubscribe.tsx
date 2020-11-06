import React from 'react';
import styled from 'styled-components';
import { PostSchema } from '../../firebase/schema';
import { StyledButton, StyledButtonRow, StyledCancelButton } from '../../styled-components/StyledButtons';


export default function PostSubscribe(props: { post: PostSchema }) {
    const { type } = props.post;
    return (
        <StyledPostSubscribe>
            <h2>Notifications</h2>
            <p>Subscribe to receive important updates and notifications.</p>
            <p>When the event is live you may join.</p>
            <PostNotificationSettings />
            <StyledButtonRow>
                <StyledCancelButton>
                    Cancel
                </StyledCancelButton>
                <StyledButton>
                    Subscribe to this {type}
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