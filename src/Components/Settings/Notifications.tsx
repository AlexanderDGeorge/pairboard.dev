import React from 'react';
import styled from 'styled-components';
import { HeavyH1 } from '../../styled-components/StyledHeaders';

export default function Notifications() {
    return (
        <StyledNotifications>
            <HeavyH1>Notifications</HeavyH1>
            <p>Coming Soon</p>
        </StyledNotifications>
    )
}

const StyledNotifications = styled.div`
    height: 100%;
    width: 100%;
    padding: 10px;
`;