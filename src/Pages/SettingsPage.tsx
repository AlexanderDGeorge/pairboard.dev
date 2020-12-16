import React from 'react';
import styled from 'styled-components';
import SettingsRouter from '../Devs/Settings/SettingsRouter';
import SettingsNav from '../Devs/Settings/SettingsNav';

export default function SettingsPage() {
    return (
        <StyledSettingsPage>
            <SettingsNav />
            <SettingsRouter />
        </StyledSettingsPage>
    );
}

const StyledSettingsPage = styled.div`
    height: 100%;
    width: 100%;
    border: 2px solid ${(props) => props.theme.accent};
    border-radius: 10px;
    background-color: ${(props) => props.theme.white};
    display: flex;
    overflow: hidden;
`;
